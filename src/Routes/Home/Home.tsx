import React, { FormEvent, useCallback, useEffect, useState, } from "react";
import { Container, SubmitButton, Form, List, DeleteButton } from './Styles'
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa'
import { Link } from "react-router-dom";
// API
import { api } from '../../services/api'
interface Repository {
    name: string;
}
export function Home() {

    const [loading, setLoading] = useState(false)
    const [newRepo, setNewRepo] = useState('')
    const [repositories, setRepositories] = useState<Repository[]>([])
    const [alert, setAlert] = useState(false)

    useEffect(() => {
        const repoStorage = localStorage.getItem('@repositorios')
        if(repoStorage){
            setRepositories(JSON.parse(repoStorage))
        }
    },[])

    useEffect(() => {
        if(repositories.length > 0 ){ //corrige o erro do localstorage desaparecer
            localStorage.setItem('@repositorios', JSON.stringify(repositories))

        }
    },[repositories])

    const hundleSubmit = useCallback((e: FormEvent) => {

        e.preventDefault()

        async function submit() {
            setLoading(true)
            setAlert(false)
            try {
                if (newRepo === '') {
                    throw new Error('Voce precisa indicar um repositorio')
                }
                const response = await api.get(`repos/${newRepo}`)

                const repositoryAlreadyExist = repositories.find(repository => repository.name === newRepo)
                if (repositoryAlreadyExist) {
                    throw new Error('Este repositorio ja existe')
                }

                const data = {
                    name: response.data.full_name
                }

                setRepositories([...repositories, data])
                setNewRepo('')


            } catch (error) {
                console.log(error)
                setAlert(true)

            } finally {
                setLoading(false)

            }
        }

        submit()

    }, [newRepo, repositories]);

    function handleInputChange(e: FormEvent) {
        setNewRepo((e.target as HTMLInputElement).value)


    }

    const handleDelete = useCallback((repository: string) => {
        const repoExist = repositories.filter(repo => repo.name !== repository)
        setRepositories(repoExist)
    }, [repositories])
    return (
        <Container>
            <h1>
                <FaGithub size={25}></FaGithub>
                Meus repositorios
            </h1>

            <Form onSubmit={hundleSubmit} error={alert}>
                <input
                    type="text"
                    placeholder="Adicionar repositorios"
                    value={newRepo}
                    onChange={(e) => { handleInputChange(e) }}
                />
                <SubmitButton loading={loading ? 1 : 0}>
                    {loading ? (
                        <FaSpinner size={14} color='#fff' className="spinner" /> //Spinner 
                    ) : (
                        <FaPlus size={14} color='#fff' />
                    )}

                </SubmitButton>

            </Form>
            <List>
                {repositories.map(repository => (
                    <li key={repository.name}>
                        <span>
                            <DeleteButton onClick={() => handleDelete(repository.name)}>
                                <FaTrash></FaTrash>
                            </DeleteButton>
                            {repository.name}</span>
                        <Link to={`repo/${encodeURIComponent(repository.name)}` }>
                            <FaBars size={20} />
                        </Link>
                    </li>
                ))}
            </List>
        </Container>
    )
}

