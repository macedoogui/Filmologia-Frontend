const baseUrl = "http://localhost:3000/filmes";

function abrirCadastro() {
  document.querySelector("#novo").style.display = "flex";
}

function fecharCadastro() {
  document.querySelector("#novo").style.display = "none";
  
  document.querySelector(".nome").value = "";
  document.querySelector(".nota").value = "";
  document.querySelector(".sinopse#descricao").value = "";
  document.querySelector(".imagem").value = "";
}

async function findAllFilmes() {
  const response = await fetch(`${baseUrl}/find-filmes`);

  const filmes = await response.json();
};
 
filmes.forEach(function (filme){
  
document.getElementById("banners").insertAdjacentHTML(
      "beforeend",
      `<div class="FilmeLista">
        <div>
            <div class="FilmeLista_nome">${filme.nome}</div>
            <div class="FilmeLista_nota">${filme.nota}</div>

            <div class="FilmeLista_sinopse"> ${filme.sinopse}</div>
          </div>
            <img class="FilmeLista_imagem" src=${
              filme.foto
            } alt=${filme.nome} />
        </div>`
    );
  });

findAllFilmes();

const findFilmeById = async () => {
  const id = document.getElementById("idFilme").value;

  const response = await fetch(`${baseUrl}/find-filme/${id}`);

  const filme = await response.json();

  const filmeEscolhidoDiv = document.getElementById("filmeEscolhido");

  filmeEscolhidoDiv.innerHTML = `<div class="FilmeLista">
    <div>
      <div class="FilmeLista__nome">${filme.nome}</div>
      <div class="FilmeLista__nota">R$ ${filme.nota}</div>
      <div class="FilmeLista__sinopse">${filme.sinopse}</div>
    </div>
      <img class="FilmeLista__imagem" src=${
        filme.imagem
      } alt=${filme.nome}/>
  </div>`;
};

async function createFilme() {
  const nome = document.querySelector(".nome").value;
  const nota = document.querySelector(".nota").value;
  const sinopse = document.querySelector(".sinopse").value;
  const imagem = document.querySelector(".imagem").value;

  const filme = {
    nome,
    nota,
    sinopse,
    imagem,
  };
  
  const response = await fetch(baseUrl + "/create", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(filme),
  });

  const novoFilme = await response.json();

  const html = `<div class="FilmeLista">
  <div>
    <div class="FilmeLista_nome">${novoFilme.nome}</div>
    <div class="FilmeLista_nota">${novoFilme.nota.toFixed(2)}</div>
    <div class="FilmeLista_sinopse">${novoFilme.sinopse}</div>
  </div>
    <img class="FilmeLista_imagem" src=${
      novoFilme.imagem
    } alt=${novoFilme.nota} />
  </div>`;

  document.getElementById("banners").insertAdjacentHTML("beforeend", html);

    fecharCadastro()
};
  
                                  