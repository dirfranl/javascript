var listElement = document.querySelector('ul#app');
var titleElement = document.querySelector('p#userId');
var inputUser = document.querySelector("input");
var buttonAddUser = document.querySelector('button');

buttonAddUser.onclick = function(){
  // console.log("botão clicado para - " + inputUser.value);
  var itemRepos = document.createElement('li');
  var itemConteudo = document.createTextNode("Carregando...");
  itemRepos.appendChild(itemConteudo);
  listElement.appendChild(itemRepos); 
  
  axios.get("https://api.github.com/users/" + inputUser.value + "/repos")
  .then(function(response){
      while(listElement.hasChildNodes()){
        var titleRemove = document.querySelector('p');
        titleRemove.innerHTML = "";
        var itemRemover = document.querySelector('li');
        listElement.removeChild(itemRemover);
      }    
      var lRepos = response.data;
      var titleContent = document.createTextNode("Este é o repositório de " 
      + inputUser.value);
      titleElement.appendChild(titleContent);
      for(repo of lRepos){
        criaItemLista(repo);
      }
    })
    .catch(function(error){
      var titleContent = document.createTextNode("Este é o repositório de " 
      + inputUser.value);
      titleElement.appendChild(titleContent);
      var itemRepos = document.createElement('li');
      var itemConteudo = document.createTextNode("Usuário inexistente");
      itemRepos.appendChild(itemConteudo);
      listElement.appendChild(itemRepos); 
      console.warm(error);
    });

}


  function criaItemLista(repo){
    var itemRepos = document.createElement('li');
    var itemConteudo = document.createTextNode(repo.name + " = " + repo.description);
    itemRepos.appendChild(itemConteudo);
    listElement.appendChild(itemRepos);
  }

  