import React, { useEffect, useState } from "react";
import { Carousel, Container, Button, Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import api from "../../services/api";

interface IFilmes {
    id: number;
    title: string;
    image: string;
    ano: string;
}

const Movie: React.FC = () => {
    const MySwal = withReactContent(Swal);
    const [filmes, setFilmes] = useState<IFilmes[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadFilmes();
    }, []);

    //CADASTRAR DADOS NA TABELA "FILMES"
    function newFilme() {
        navigate("/filmes/cadastro");
    }

    //OBTER OS DADOS DA TABELA "FILMES"
    async function loadFilmes() {
        try {
            const response = await api.get("/filmes");
            setFilmes(response.data);
            //console.log(response.data);
        } catch(e) {
            MySwal.fire({
                icon: 'error',
                text: 'Erro ao listar filmes',
                confirmButtonText: 'OK',
                showConfirmButton: true,
                allowOutsideClick: false,
                allowEscapeKey: false,
            }).then(function() {
                //console.error('Erro ao listar filmes', e);
            });
        }
    }

    //OBTER OS DADOS DA TABELA "FILMES" POR ID
    function viewFilme(id: number) {
        navigate(`/filmes/${id}`);
    }

    return (
        <main>
            <section className="section">
                <Carousel data-bs-theme="dark">
                    <Carousel.Item>
                        <div className="carousel-bg-img" style={{ backgroundImage: `url("https://i.pinimg.com/originals/2f/e6/ac/2fe6acc4e989a08d46d92ac293196c80.jpg")` }}></div>
                        <div className="carousel-bg-img-overlay"></div>
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="carousel-bg-img" style={{ backgroundImage: `url("https://i.pinimg.com/originals/2f/88/a9/2f88a9427474343f7275e3b8f6fcc2e1.jpg")` }}></div>
                        <div className="carousel-bg-img-overlay"></div>
                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>

                <Container>
                    <header>
                        <h1>Filmes</h1>
                        <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                    </header>
                    <Button variant="success" onClick={newFilme}>Cadastrar</Button>
                </Container>
            </section>
            <article className="article">
                <Container>
                    <Row className="g-4">
                        {
                            filmes.map(filme => (
                                <Col key={filme.id} xs={6} md={2} className="d-flex">
                                    <Card className="card-movie" onClick={() => viewFilme(filme.id)}>
                                        <Card.Img src={filme.image} className="h-100" variant="top" />
                                        <Card.Body>
                                            <h1 className="text-truncate">{filme.title}</h1>
                                            <p className="text-truncate">{filme.ano}</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        }
                    </Row>
                </Container>
            </article>
            <Footer />
        </main>
    );
};
export default Movie;