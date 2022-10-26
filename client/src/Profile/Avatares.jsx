import React, { Component } from "react";
import { connect } from "react-redux";
import "./Avatares.css"


class Avatares extends Component {
    constructor(props) {
        super(props);
        this.state = { image: "", loading: true };
    }

    componentDidMount() {

        for (let index = 0; index < this.props.images.length; index++) {
            const element = this.props.images[index];
            if (element.url === this.props.imageInput) {
                this.setState({
                    ...this.state,
                    image: this.props.imageInput,
                });
                break;
            }
        }
    }

    ChangeImage(e, url) {
        if (this.state.image != url)
            this.setState({
                ...this.state,
                image: url,
            });
    }




    render() {
        return (
            this.props.images.length !== 0 ?
                <div className="AvataresContainer">
                    <div className="AvataresContainerFlex">
                        <div className="AvataresImages">
                            {this.props.images.map((c, index) => (
                                <img id={this.state.image === c.url ? "SeleccionadoImageAvatar" : ("NoSeleccionadoImageAvatar" + index)} className="AvatarImage" onClick={(e) => this.ChangeImage(e, c.url)} key={index + "Avatar"} src={c.url} alt={"No found avatar"}
                                />
                            ))}
                        </div>
                        <div className="AvataresButtons">
                            <button className="btnGlobal Avatarbutton" onClick={(e) => this.props.handleModalCloseAvatar(e)}>Cancel</button>
                            {(this.state.image !== this.props.imageInput && this.state.image != "") ?
                                <button className="btnGlobal Avatarbutton" onClick={() => this.props.handleChangeImage(this.state.image)}>Set Change</button>
                                : <label className="btnAvatarHide">Select Your Avatar</label>}
                        </div>
                    </div>
                </div>
                :
                <div className="cards">
                    <p>
                        <b>{"No avatars found"}</b>
                    </p>
                </div>
        );
    }
}


export default (Avatares);
