import { useState, useEffect } from 'react';
import SalaContext from './SalaContext';
import Tabela from './Tabela';
import Form from './Form';

function Sala() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({codigo: "", numero: "", descricao: "", capacidade: "", predio: ""});
    const [listaPredios, setListaPredios] = useState([]);

    const recuperaPredios = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/predios`)
            .then(response => response.json())
            .then(data => setListaPredios(data))
            .catch(err => console.log('Erro: ' + err))
    }

    const recuperaSalas = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/salas`)
            .then(response => response.json())
            .then(data => setListaObjetos(data))
            .catch(err => console.log('Erro: ' + err))
    }

    const recuperar = async codigo => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/salas/${codigo}`)
            .then(response => response.json())
            .then(data => setObjeto(data))
            .catch(err => console.log({ status: "error", message: err }))
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/salas`, 
            {
                method: metodo,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(objeto),
            }).then(response => response.json())
                .then(json => {
                    setAlerta({ status: json.status, message: json.message });
                    setObjeto(json.objeto);
                    if (!editar) {
                        setEditar(true);
                    }
                });
        } catch (err) {
            console.error(err.message);
        }       
        recuperaSalas();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                await
                    fetch(`${process.env.REACT_APP_ENDERECO_API}/salas/${objeto.codigo}`,
                        { method: "DELETE" })
                        .then(response => response.json())
                        .then(json => setAlerta({ status: json.status, message: json.message }))
                recuperaSalas();
            } catch (err) {
                console.log('Erro: ' + err)
            }
        }
    }

    useEffect(() => {
        recuperaPredios();
        recuperaSalas();
    }, []);

    return (
        <SalaContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos, setListaObjetos,               
                recuperaPredios, remover,
                objeto, setObjeto,
                editar, setEditar,
                recuperar,
                acaoCadastrar,
                handleChange, listaPredios
            }
        }>
            <Tabela />
            <Form />
        </SalaContext.Provider>
    );
}

export default Sala;