import { Lancamento } from "../../classes/lancamento.js";
import { Usuario } from "../../classes/usuario.js";
let usuarioLogado = new Usuario("", "", "");
usuarioLogado.setDados(JSON.parse(localStorage.getItem("usuario_logado")));
let lancamentos = new Array();
let chaveLocalStorage = `${usuarioLogado.getEmail()}_lancamentos`;
console.log('chaveLocalStorage', chaveLocalStorage);
// localStorage.removeItem(chaveLocalStorage)
let itemCorrente;
carregarDados();
function carregarDados() {
    $("input").val("");
    $("textarea").val("");
    $("#editar").hide();
    $("#enviar").show();
    itemCorrente = undefined;
    let informacao = localStorage.getItem(chaveLocalStorage);
    if (informacao == undefined) {
        salvar();
        carregarDados();
    }
    else {
        let listaTemporaria = JSON.parse(informacao);
        lancamentos = new Array();
        listaTemporaria.forEach(temporario => {
            let lancamento = new Lancamento(temporario.titulo, temporario.debito, temporario.valor, temporario.data, temporario.observacao);
            lancamentos.push(lancamento);
            escreveLinha(lancamento);
        });
    }
}
function salvar() {
    localStorage.setItem(chaveLocalStorage, JSON.stringify(lancamentos));
}
function escreveLinha(lancamento) {
    $("tbody").append($("<tr>").append($("<td>", { text: converterData(lancamento.data) }), $("<td>", { text: lancamento.debito ? "Debito" : "Credito" }), $("<td>", { text: lancamento.titulo }), $("<td>", { text: lancamento.valor })));
}
$('form').on("submit", (event) => {
    event.preventDefault();
    let formulario = new Lancamento(String($("#titulo_form").val()), $("#debito").is(":checked"), Number($("#valor_form").val()), new Date(String($("#data_form").val())), String($("#observacao").val()));
    if (itemCorrente == undefined) {
        adicionar(formulario);
    }
    else {
        atualizar(formulario);
    }
});
function adicionar(lancamento) {
    lancamentos.push(lancamento);
    salvar();
    escreveLinha(lancamento);
}
function atualizar(formulario) {
}
function converterData(data) {
    return `${m10(data.getDate())}/${m10(data.getMonth() + 1)}/${m10(data.getFullYear())}`;
}
function m10(numero) {
    return numero < 10 ? ("0" + numero) : (String(numero));
}
