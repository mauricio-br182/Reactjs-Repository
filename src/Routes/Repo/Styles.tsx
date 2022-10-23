import styled from "styled-components";
import { Link } from 'react-router-dom'

export const Loading = styled.div`
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

export const Container = styled.div`
    max-width: 700px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.25);
    padding: 30px;
    margin: 80px auto;
`

export const Owner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    img{
        width: 150px;
        border-radius: 20%;
        margin: 20px 0;
    }
    h1{
        font-size: 30px;
        color: #0d2636;
    }

    p{
        margin-top: 5px;
        font-size: 15px;
        color: #000;
        text-align: center;
        line-height: 1.4;
        max-width: 400px;
    }
    `
    export const BackButton = styled(Link)`
        background: transparent;
    `
    export const IssuesList = styled.ul`
        margin-top: 30px;
        padding-top: 30px;
        border-top: 1px solid #eee;
        list-style: none;



        li{
            display: flex;
            padding: 15px 10px;

            & + li {
                margin-top:  12px;
            }
            
            img{
                width: 38px;
                height: 38px;
                border-radius: 50%;
                border: 2px solid #0d2636;
            }

            div{
                flex: 1;
                margin-left: 12px;

                p{
                    margin-top: 10px;
                    font-size: 12px;
                    color: #000;
                    margin-block-start: 0;
                    margin-block-end: 0;
                }
            }
            strong{
                font-size: 15px;
                a{
                    text-decoration: none;
                    color: #222;
                    transform: 0.3s;
                
                    &:hover{
                        color: #0071db;
                    }
                }
                span{
                    background: #333;
                    color: #fff;
                    font-size: 12px;
                    font-weight: 600;
                    padding: 4px 7px;
                    border-radius: 4px;
                    margin-left: 10px;
                }


            }
        }
    `

    export const PageAction = styled.div`
        display: flex;
        align-items: center;
        justify-content: space-between;

        button{
            color: #fff;
            background: #222;
            padding: 2px 10px;
            outline: 0;
            border: none;
            border-radius: 4px;

        &:disabled{
            cursor: not-allowed;
            opacity: 0.5;
        }
        }
    `
    export const FilterButton = styled.div`
        display: flex;
        align-items: center;
        justify-content: flex-start;
        label{
            margin-right: 4px;
        }
        button{
            outline: 0;
            border: none;
            color: #fff;
            background: #222;
            padding: 3px 6px;
            border-radius: 4px;
            &:nth-of-type(2){
                margin: 5px;
            }

            &:disabled{
                background: #ddd;
                color: #222;
            }
        }

    `