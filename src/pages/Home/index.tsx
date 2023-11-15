import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import background from "../../assets/images/background.jpg";

const Home: React.FC = () => {
    const navigate = useNavigate();

    //OBTER OS DADOS DA TABELA "FILMES"
    function pageFilmes() {
        navigate("/filmes");
    }

    return (
        <main className="main-home">
            <article className="article-home" style={{ backgroundImage: `url(${background})` }}>
                <div className="article-home-overlay"></div>

                <section className="section-home container">
                    <h1>Resenha Filmes</h1>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                    <Button variant="primary" size="lg" onClick={pageFilmes}>VER FILMES</Button>
                </section>
            </article>
        </main>
    );
}
export default Home;