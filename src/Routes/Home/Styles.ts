import styled, { keyframes, css } from "styled-components";

type Props = {
  loading: number;
}
type PropsError = {
  error: boolean;
}
export const Container = styled.section`
  max-width: 700px;
  background-color: #fff;
  padding: 30px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.25  );
  margin: 80px auto;
  border-radius: 4px;
  
  h1{
    font-size: 20px;
    display: flex;
    align-items: center;
    flex-direction: row ;
    svg{
      margin-right: 30px;
    }

  }

`
export const Form = styled.form<PropsError>`
  margin-top: 30px;
  display:  flex;
  flex-direction: row ;
  input{
    flex: 1;
    border: 1px solid ${props => (props.error? '#ff0000': '#eee')  };
    padding: 10px 15px;
    font-size: 17px;
    border-radius: 4px;
  }
`
//animate
// const animate = keyframes `
//   from{
//     transaform: rotate(0deg);

//   }
//   to{
//     transform: rotate(360deg)
//   }
// `;

//animate
export const SubmitButton = styled.button.attrs((props: Props )=>({ //propsType
  type: 'submit',
  disabled: props.loading, //props

}))<Props>` //props type
  background: #0d1d36;
  border: 0;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled]{
    cursor: not-allowed;
    opacity: 0.5;
  }

  // animate 
  ${ props => props.loading && 
    css`
      .spinner {
        animation: spin infinite 2s linear;
      }

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `
  }
  //animate

`

export const List = styled.ul`
  list-style: none;
  margin-top: 20px;
  padding-inline-start: 0;
  
  li{
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    span{
      padding-left: 0;
    }

    & + li{
      border-top: 1px solid #eee;
    }

    a{
      color: #0d2636;
      text-decoration: none;
    }
  }

`
export const DeleteButton = styled.button.attrs({
  type: 'submit',
})`
  color: #0d2636;
  padding: 8px 7px;
  outline: none;
  border: 0;
  border-radius: 4px;
  background: transparent;
  align-items: center;
`