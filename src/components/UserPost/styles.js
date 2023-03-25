import styled from "styled-components"

export const PostArea = styled.div`
    font-family: 'Lato', sans-serif;
    background-color: #1E1E1E;
    color: #fff;
    border-radius: 12px;
`

export const PostContent = styled.div`
    
    margin: 0 auto;
    margin-top: 25px;
    padding: 20px;
    max-width: 800px;
    height: auto;
    background-color: #171717;
    border-radius: 12px;
    display: flex;
`

// export const PostArea = styled.div`
//     font-family: 'Lato', sans-serif;
//     margin: 0 auto;
//     margin-top: 25px;
//     padding: 20px;
//     max-width: 800px;
//     height: auto;
//     background-color: #171717;
//     color: #fff;
//     border-radius: 12px;
//     display: flex;
// `

export const CommentsArea = styled.div`

`
    
export const PostComments = styled.div`
    padding: 0 20px;
    max-height: 250px;
    overflow-y: scroll;
`
export const PostComment = styled.div`
    display: flex;
    padding: 20px 0;
    border-bottom: 1px solid #353535;

    .avatar{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-left: 5px;
        margin-right: 18px;
    }
    .content{

    }
    .user-name{
        span{
            color: #565656;
        }
    }
    .text-comment{
        color: #ACACAC;
    }
`
export const InputCommentArea = styled.div`
    padding: 20px 20px;
    display: flex;
    align-items: center;
    position: relative;

    .avatar{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-left: 5px;
        margin-right: 18px;
    }

    .text-comment{
        background-color: #252525;
        color: #575757;
        font-size: 14px;
        padding-left: 10px;
        padding-right: 40px;
        outline: none;
        border: 0;
        height: 40px;
        border-radius: 5px;
        width: 100%;
    }

    .send-icon{
        position: absolute;
        right: 35px;
        cursor: pointer;
    }
`

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
`
export const Icons = styled.div`
    display: flex;
    gap: 10px;

    .icon{
        width: 20px;
        height: 20px;
        cursor: pointer;
    }
`

export const LinkArea = styled.a`
    width: 100%;
    min-height: 155px;
    border: 1px solid #4D4D4D;
    border-radius: 12px;
    display: flex;

    .left{
        width: 100%;
        margin-left: 12px;
        padding: 5px;

        .title{
            color: #CECECE;
            font-size: 16px;
            margin-top: 12px;
        }
        .subtitle{
            color: #9B9595;
            font-size: 11px;
            margin: 8px 0;
        }
        .link{  
            color: #CECECE;
            font-size: 11px;
            word-break: break-all;
        }
    }
    .right{
        max-width: 250px;

        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-top-right-radius: 12px;
            border-bottom-right-radius: 12px;
        }
    }

    @media(max-width: 600px){
        .right{
            max-width: 100px;
        }
    }

`

export const Avatar = styled.img`
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 20px;

    &:hover {
        cursor: pointer;
    }
`
export const Infos = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    

    .user-name{
        font-size: 19px;
    }
    .description{
        color: #B7B7B7;
        margin: 12px 0;
    }
`

export const Left = styled.div`
    width: 75px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-right: 30px;

    .heart-sharp-icon,
    .heart-outline-icon,
    .chat-icon, 
    .repost-icon {
        width: 25px;
        height: 25px;
        margin-bottom: 5px;
        cursor: pointer;
    }

    .text-count{
        text-align: center;
        font-size: 11px;
        margin-bottom: 15px;
    }

    .heart-sharp-icon {
        color: red;
    }

`
export const Right = styled.div`
    width: 100%;
`

export const TextArea = styled.textarea`
    background: #FFFFFF;
    border-radius: 7px;
    border: none;
    overflow: auto;
    outline: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    resize: none;
    margin: 10px 0;
    padding: 10px;
`