import emailjs from '@emailjs/browser';
import React from 'react';
import './contact.css';
import '../CreateProduct/CreateProduct.css'

export default function Contact() {

    function sendEmail(e) {
        e.preventDefault();

    emailjs.sendForm('service_coazmfj', 'template_wwiqndj', e.target, 'zpMvRbOIVa66tbavd')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        e.target.reset()
    }

    return(
        <div>
            <div className="containerContact">
                <div className="formContact">
                    <form onSubmit={sendEmail} >
                        <div className="l__form__input-field">
                            <input type="text" className="form-control" placeholder="Name" name="name"/>
                        </div>
                        <div className="l__form__input-field">
                            <input type="email" className="form-control" placeholder="Email Address" name="email"/>
                        </div>
                        <div className="l__form__input-field">
                            <input type="text" className="form-control" placeholder="Subject" name="subject"/>
                        </div>
                        <div className="field">
                            <textarea className="form-txtArea" id="" cols="30" rows="8" placeholder="Your message" name="message"></textarea>
                        </div>
                        <div className="field">
                            <input type="submit" className="Login_btnLoginModal__1R93O btnContact" value="Send Message"></input>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
