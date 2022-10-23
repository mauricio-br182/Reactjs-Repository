import React, { useEffect, useState } from "react";
import {useParams} from 'react-router-dom'
import { Container, Owner, Loading, BackButton, IssuesList, PageAction, FilterButton} from "../Repo/Styles";
import { api } from "../../services/api";
import {FaArrowLeft} from 'react-icons/fa'

interface RepositoryProps{
    name?: string;
    description?: string;
}
export function Repo (){
  
    const [ repository, setRepository ] = useState<RepositoryProps[]>([])
    const [ issues, setIssues ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ page, setPage ] = useState(1)
    const [filter, setFilter] = useState('open')

    const { repo } = useParams();

    function hundleFilter(action: string){
        // if(action === 'open'){
        //     setFilter('open')
        // } else if(action === 'closed'){
        //     setFilter('closed')
        // } else{
        //     setFilter('all')
        // }
        setFilter(action)
    }
    
    function hundlePage(action: string){
        
        setPage(action === 'back' ? page - 1 : page + 1) 
        console.log(page)
    }
    useEffect(()=>{
        async function FilterIssues(){
            const response = await api.get(`repos/${repo}/issues`, {
                params: {
                    state: filter,
                    page,
                    per_page: 5,
                }
            })

            setIssues(response.data)
        }
        FilterIssues()
    },[filter])
    useEffect(()=>{
        async function loadIssue(){
            const response = await api.get(`repos/${repo}/issues`, {
                params: {
                    state: 'open',
                    page,
                    per_page: 5,
                }
            })

            setIssues(response.data)
        }
        loadIssue()
    },[page])

    useEffect(()=>{

        async function getApi(){

            const [repositoryData, issuesData] = await Promise.all([
                api.get(`repos/${repo}`),
                api.get(`repos/${repo}/issues`, {
                    params: {
                        state: 'open',
                        per_page: 5,
                    }
                })
            ]);

            setRepository(repositoryData.data);
            setIssues(issuesData.data);
            setLoading(false);
        }
        getApi();

    },[]);

    if(loading){
        return(
            <Loading>
                <h1>
                    carregando...
                </h1>
            </Loading>
        );
    };
    return (
        
        <Container>
            <BackButton to='/'>
                <FaArrowLeft color='#000' size={30}/>
            </BackButton>
            <Owner>
                <img
                    src={repository.owner.avatar_url} 
                    alt={repository.owner.login}
                />
                <h1>
                    {repository.name}
                </h1>
                <p>{repository.description}</p>
            </Owner>
            <IssuesList>
                <FilterButton>
                    <label>Filtrar por:</label>
                    <button type='button' disabled={filter === 'open'} onClick={()=> hundleFilter('open')}>open</button>
                    <button type='button' disabled={filter === 'all'} onClick={()=> hundleFilter('all')}>all</button>
                    <button type='button' disabled={filter === 'closed'} onClick={()=> hundleFilter('closed')}>closed</button>
                </FilterButton>
                {issues.map(issue => (
                    <li key={String(issue.id)}>
                        <img 
                        src={issue.user.avatar_url} 
                        alt={issue.user.login} 
                        />
                        <div>
                            <strong>
                                <a href={issue.html_url}>{issue.title}</a>
                                {issue.labels.map(label=> (
                                    <span key={String(label.id)}>
                                        {label.name}
                                    </span> 
                                ))}
                            </strong>
                            <p>{issue.user.login}</p>
                        </div>
                    </li>
                ))}
            </IssuesList>

            <PageAction>
                <button 
                    type="button" 
                    disabled={page < 2 }
                    onClick={()=> hundlePage('back')
                    }>Voltar
                </button>
                <button 
                    type="button" 
                    onClick={()=> hundlePage('next')
                    }>Proxima
                </button>
            </PageAction>
        </Container>
    )
}

// example route


