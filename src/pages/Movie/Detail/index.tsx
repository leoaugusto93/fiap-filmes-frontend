import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Button } from 'react-bootstrap';
import Footer from "../../../components/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import api from "../../../services/api";

interface IFilmes {
    id: number;
    title: string;
    description: string;
    image: string;
    ano: string;
}

const Detail: React.FC = () => {
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();
    const { id } = useParams<{id: string}>();
    const[filme, setFilme] = useState<IFilmes>();

    useEffect(() => {
        findFilme();
    }, [id])

    //RETORNA PARA A PÁGINA FILMES
    function back() {
        navigate(-1);
    }

    //OBTER OS DADOS DA TABELA "FILMES" POR ID
    async function findFilme() {
        try {
            const response = await api.get<IFilmes>(`/filmes/${id}`)
            setFilme(response.data);
        } catch(e) {
            MySwal.fire({
                icon: 'error',
                text: 'Erro ao carregar página',
                confirmButtonText: 'OK',
                showConfirmButton: true,
                allowOutsideClick: false,
                allowEscapeKey: false,
            }).then(function() {
                back();
                //console.error('Erro ao carregar página', e);
            });
        }
    }

    //OBTER OS DADOS DA TABELA "FILMES" POR ID
    function editFilme(id: number) {
        navigate(`/filmes/cadastro/${id}`);
    }

    return (
        <main>
            <section className="section">
                <Container>
                    <header>
                        <h1>{filme?.title}</h1>
                    </header>
                    <div className="d-flex gap-2">
                        <Button variant="primary" onClick={() => editFilme(filme?.id!)}>Editar</Button>
                        <Button variant="dark" onClick={back}>Voltar</Button>
                    </div>
                </Container>
            </section>
            <article className="article">
                <Container>
                    <div className="article-movie">
                        <figure><img src={filme?.image} alt="" /></figure>
                        <div>
                            <h5>SINOPSE</h5>
                            <p><strong>Ano:</strong> {filme?.ano}</p>
                            <p>{filme?.description}</p>
                        </div>
                    </div>
                </Container>
            </article>
            <Footer />
        </main>
    );
}
export default Detail;