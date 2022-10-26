import React from "react";
import style from "./About.module.css"


export default function About() {
    return (
        <div className={style.container}>
            <main>
                <div className={style.ContainerAbout}>
                    <section>
                        <div className={style.aboutTextprincipal}>
                            <p>fashion and style in one place</p>
                        </div>
                        <h2 className={style.aboutTitle}>Who we are?</h2>
                        <p className={style.aboutInfo}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae nihil quos, voluptate nobis veritatis porro atque officia ducimus suscipit in voluptatibus reprehenderit nesciunt omnis harum praesentium commodi eos blanditiis facere.</p>
                    </section>
                    <section className={style.ContainerImagesAbout}>
                        <img src="https://images.pexels.com/photos/9393441/pexels-photo-9393441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Image 1" className={style.imageContain} />
                        <img src="https://images.pexels.com/photos/13329172/pexels-photo-13329172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Image 2" className={style.imageContain} />
                        <img src="https://images.pexels.com/photos/7585590/pexels-photo-7585590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Image 3" className={style.imageContain} />
                    </section>
                </div>
            </main>
        </div>
    )
}
