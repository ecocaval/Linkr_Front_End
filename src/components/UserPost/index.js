import { Avatar, Header, Icons, Infos, Left, LinkArea, PostArea, Right } from "./styles"
import { IoHeartOutline, IoTrashSharp, IoPencilSharp } from "react-icons/io5";

export default function UserPost(){
    return (
        <PostArea>
            <Left>
                <Avatar src="https://ogimg.infoglobo.com.br/in/24907109-c86-bcf/FT1086A/avatar-a-lenda-de-aang.jpg" />
                <IoHeartOutline className="heart-outline-icon" />
                <div className="likes-count">14 likes</div>
            </Left>
            <Right>
                <Infos>
                    <Header>
                        <div className="user-name">Juvenal Juvênio</div>
                        <Icons>
                            <IoPencilSharp className="icon" />
                            <IoTrashSharp className="icon" />
                        </Icons>
                    </Header>
                    <div className="description">Muito obrigado</div>
                    <LinkArea>
                        <div className="left">
                            <div className="title">Como aplicar o Material UI em um Projeto React</div>
                            <div className="subtitle">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, obcaecati cumque repudiandae voluptatum ad illo. 
                            </div>
                            <div className="link">
                                https://www.material-ui.com
                            </div>
                        </div>
                        <div className="right">
                            <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--IwFcphyV--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://thepracticaldev.s3.amazonaws.com/i/vb6ai56xqgpc0bcfn92y.png" alt="" />
                        </div>
                    </LinkArea>
                </Infos>
            </Right>
        </PostArea>
    )
}