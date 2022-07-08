import { useContext } from 'react'
import Alerta from '../../Alerta';
import SalaContext from './SalaContext';



function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta, listaPredios } = useContext(SalaContext);

    (function () {
        'use strict'

        var forms = document.querySelectorAll('.needs-validation')

        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }

                    form.classList.add('was-validated')
                }, false)
            })
    })()

    return (
        <div className="modal fade" id="modalEdicao" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Sala</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id="formulario" onSubmit={acaoCadastrar}
                        className="needs-validation" noValidate>
                        <div className="modal-body">
                            <Alerta alerta={alerta} />
                            <div className="form-group">
                                <label htmlFor="txtCodigo" className="form-label">
                                    Código
                                </label>
                                <input
                                    type="text"
                                    readOnly
                                    className="form-control"
                                    id="txtCodigo"
                                    name="codigo"
                                    value={objeto.codigo}
                                    onChange={handleChange}
                                />
                                <div class="invalid-feedback">
                                    preenxa esse campo!
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtNumero" className="form-label">
                                    Numero
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="txtNumero"
                                    name="numero"
                                    value={objeto.numero}
                                    onChange={handleChange}
                                    required
                                />
                                <div class="invalid-feedback">
                                    preenxa esse campo!
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtDescricao" className="form-label">
                                    Descrição
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="txtSite"
                                    name="descricao"
                                    value={objeto.descricao}
                                    onChange={handleChange}
                                    required
                                />
                                <div class="invalid-feedback">
                                    preenxa esse campo!
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtCapacidade" className="form-label">
                                    Capacide
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="txtCapacidade"
                                    maxLength="4"
                                    name="capacidade"
                                    value={objeto.capacidade}
                                    onChange={handleChange}
                                    required
                                />                                
                                <div class="invalid-feedback">
                                    preenxa esse campo!
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="selectPredio" className="form-label">
                                    Prédio
                                </label>
                                <select
                                    className="form-control"
                                    id="selectPredio"
                                    name="predio"
                                    value={objeto.predio}
                                    onChange={handleChange}
                                    required>
                                        <option disabled = "true" value = "">
                                            (selecione o predio)
                                        </option>
                                        {listaPredios.map((predio) => (
                                            <option key = {predio.codigo}
                                                value = {predio.codigo}>
                                                {predio.nome}
                                            </option>
                                        ))}
                                </select>                                
                                <div class="invalid-feedback">
                                    preenxa esse campo!
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="submit" className="btn btn-success" >
                                Salvar  <i className="bi bi-save"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Form;