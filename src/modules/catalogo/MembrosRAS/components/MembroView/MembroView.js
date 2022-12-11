import Axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";



import "./MembroView.css";

export default function MembroView() {

    const {id} = useParams();

    const [pessoa, setPessoa] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/pessoa/" + id).then((response) => {

            let data = response.data;

            if (data.error) {
                alert(`ERRO: ${data.error.sqlMessage}`);
            }

            setPessoa(response.data);
        });
    }, [id]);

    return (
        <div className="membro-view-card">        
            <div className="membro-card-options">
                    <Link to={"/membros"} className="membro-card-close">X</Link>
                {typeof pessoa !== "undefined" && pessoa.map((value) => {
                    return (<>
                        <div className="member-view-column">
                            <div className="selected-member-name">{value.NOME}</div>
                            <a className="selected-member-email" href={`mailto:${value.EMAIL}`}>{value.EMAIL}</a>
                            <div className="selected-member-ativo">(Usuário {value.ATIVO})</div>

                            <div className="selected-member-in-project-row">
                                <div className="selected-member-data-entered-course">
                                    Ingressou no curso em {sqlToJsDate(value.DT_INGRESSO_CURSO)}
                                </div>
                            </div>

                            <div className="selected-member-in-project-row">
                                <div className="selected-member-data-entered-ras">
                                    Ingressou no RAS em {sqlToJsDate(value.DT_INGRESSO_RAS)}
                                </div>
                            </div>
                            {value.PROJETO_ID !== null ? 
                            <button className="go-project-btn" onClick={(_) => {
                                window.location.href = `http://localhost:3000/projeto/${value.PROJETO_ID}`;
                            }}>🠺 Ir para projeto</button> 
                            : null}

                            <button className="habilidades-membro-btn"
                                onClick={(_) => {
                                    window.location.href = `http://localhost:3000/habilidade-membro/${id}`;
                                }}
                            >HABILIDADES DO MEMBRO</button>
                            <button className="deletar-membro-btn"
                                onClick={(_) => {
                                    Axios.delete(`http://localhost:3001/deletar-membro/${id}`).then((response) => {
                                        console.log(response.data);
                                        if (response.data.error) {
                                            alert(`ERRO: NÃO PODE DELETAR UM MEMBRO RESPONSÁVEL POR UM PROJETO!`);
                                        } else {
                                            alert(`Membro [${id}] deletado com sucesso!`);
                                            window.location.href = "http://localhost:3000/membros";
                                        }

                                    });
                                }}
                            >DELETAR MEMBRO</button>

                        </div>
                    </>);
                })}
            </div>
        </div>
    );

    function parseMes(mes) {

        const translateMes = {
            "jan": "janeiro",
            "feb": "fevereiro",
            "mar": "março",
            "apr": "abril",
            "may": "maio",
            "jun": "junho",
            "jul": "julho",
            "aug": "agosto",
            "sep": "setembro",
            "oct": "outubro",
            "nov": "novembro",
            "dec": "dezembro",
        }

        let entries = Object.entries(translateMes);
        
        let meses = entries.filter(([key, value]) => {
            return key.toLowerCase() === mes.toLowerCase() ? value : "";
        }).at(0)[1];

        return meses;
    }

    function sqlToJsDate(sqlDate){
        let dateTime = sqlDate.replace("T", " ").replace("Z", "");

        let dateTimeParts= dateTime.split(/[- :]/);
        dateTimeParts[1]--;

        let dateStr = new Date(...dateTimeParts).toString();

        return formatDataBR(formatDate(dateStr));
    }

    function formatDate(date) {
        const dateSplit = date.split("03:00:00 GMT");

        let justDate = dateSplit[0];

        return justDate;
    }

    function formatDataBR(data) {
        const dataSep = data.split(" ");
        let mes = dataSep[1];
        let dia = dataSep[2];
        let ano = dataSep[3];

        return dia + " de " + parseMes(mes) + " de " + ano;
    }

}