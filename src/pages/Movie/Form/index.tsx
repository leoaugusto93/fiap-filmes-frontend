import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Button, Col, Row, FloatingLabel, Form as BootstrapForm } from 'react-bootstrap';
import Footer from "../../../components/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import api from "../../../services/api";

interface IFilmes {
    title: string;
    description: string;
    image: string;
    ano: string;
}

const Form: React.FC = () => {
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [model, setModel] = useState<IFilmes>({
        title: "",
        description: "",
        image: "",
        ano: "",
    });

    useEffect(() => {
        //console.log(id);
        if(!id) return;
        findFilme(id);
    }, [id]);

    //FUNÇÃO PARA ATUALIZAR O MODELO "model"
    function updateModel(e: ChangeEvent<HTMLInputElement>) {
        setModel({
            ...model,
            [e.target.name]: e.target.value,
        });
    }

    //SUBMETE OS DADOS DO FORMULÁRIO
    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const response = id
            ? await api.put(`/filmes/${id}`, model)
            : await api.post("/filmes", model);
            //console.log(model);

            MySwal.fire({
                icon: 'success',
                text: 'Cadastrado com sucesso',
                confirmButtonText: 'OK',
                showConfirmButton: true,
                allowOutsideClick: false,
                allowEscapeKey: false,
            }).then(function() {
                back();
            });
        } catch(e) {
            MySwal.fire({
                icon: 'error',
                text: 'Erro ao cadastrar',
                confirmButtonText: 'OK',
                showConfirmButton: true,
                allowOutsideClick: false,
                allowEscapeKey: false,
            }).then(function() {
                back();
                //console.error('Erro ao salvar filme', e);
            });
        }
    }

    //RETORNA PARA A PÁGINA FILMES AO SALVAR
    function back() {
        navigate(-1);
    }

    //OBTER OS DADOS DA TABELA "FILMES" POR ID
    async function findFilme(id?: string) {
        try {
            const response = await api.get(`/filmes/${id}`);
            setModel({
                title: response.data.title,
                description: response.data.description,
                image: response.data.image,
                ano: response.data.ano,
            });
            //console.log(response);
        } catch(e) {
            MySwal.fire({
                icon: 'error',
                text: 'Erro ao editar filme',
                confirmButtonText: 'OK',
                showConfirmButton: true,
                allowOutsideClick: false,
                allowEscapeKey: false,
            }).then(function() {
                back();
                //console.error('Erro ao editar filme', e);
            });
        }
    }

    return (
        <main>
            <section className="section">
                <Container>
                    <header>
                        <h1>Filme</h1>
                    </header>
                </Container>
            </section>
            <article className="article">
                <Container>
                    <BootstrapForm onSubmit={onSubmit} autoComplete="off">
                        <Row>
                            <Col xs={12} md={6}>
                                <FloatingLabel className="mb-3" label="Título">
                                    <BootstrapForm.Control
                                        type="text"
                                        name="title"
                                        value={model.title}
                                        placeholder="Digite o título"
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col xs={12} md={6}>
                                <FloatingLabel className="mb-3" label="Ano">
                                    <BootstrapForm.Control
                                        type="text"
                                        name="ano"
                                        value={model.ano}
                                        placeholder="Digite o ano"
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col xs={12} md={12}>
                                <FloatingLabel className="mb-3" label="Imagem">
                                    <BootstrapForm.Control
                                        type="text"
                                        name="image"
                                        value={model.image}
                                        placeholder="Digite o título"
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col xs={12} md={12}>
                                <FloatingLabel className="mb-3" label="Descrição">
                                    <BootstrapForm.Control
                                        type="text"
                                        as="textarea"
                                        rows={3}
                                        name="description"
                                        value={model.description}
                                        placeholder="Digite a descrição"
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                                        style={{ height: '100px' }}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <Button variant="primary" type="submit">Salvar</Button>
                            <Button variant="dark" onClick={back}>Cancelar</Button>
                        </div>
                    </BootstrapForm>
                </Container>
            </article>
            <Footer />
        </main>
    );
};
export default Form;