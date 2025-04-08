# 📱 ContatosView - Aplicativo de Contatos em React Native

Este projeto é uma interface simples e funcional de gerenciamento de contatos desenvolvida com **React Native**. Ele permite ao usuário visualizar, buscar, editar e excluir contatos com interação por **Swipe (deslize lateral)**. Inclui também uma base para a adição de novos contatos via botão flutuante (FAB).

## ✨ Funcionalidades

- 🔍 **Busca em tempo real** por nome ou tipo de contato.
- 👆 **Swipe lateral** para editar ou excluir contatos.
- ⚠️ **Alertas de confirmação** antes da exclusão.
- 📱 Interface moderna com FlatList e botões flutuantes.
- 🚫 Mensagem de vazio quando não há contatos.
- 🎨 Estilização profissional com componentes reutilizáveis.
- 🌐 Simulação de requisição a uma API externa.

---

## 🧱 Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/)
- [Ionicons](https://ionic.io/ionicons)

---

## 🏗️ Estrutura do Projeto

ContatosView.js

yaml
Copiar
Editar

Contém:
- `ContatoItem`: componente `memo` para renderização individual dos contatos com suporte a swipe.
- `ContatosView`: componente principal contendo os estados, `useEffect` para carregamento dos dados, filtros e renderização da lista.
- `styles`: objeto com todos os estilos da interface, separado em seções.

---

## ⚙️ Instalação e Execução

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
2. Instale as dependências
bash
Copiar
Editar
npm install
Ou, se estiver usando yarn:

bash
Copiar
Editar
yarn
3. Execute o projeto
bash
Copiar
Editar
npx expo start
📂 Exemplo de API (Mock)
Para testes, simule uma API com o seguinte JSON de contatos:

json
Copiar
Editar
[
  {
    "id": 1,
    "nome": "Maria Silva",
    "telefone": "31 98888-9999",
    "tipo": "Amiga"
  },
  {
    "id": 2,
    "nome": "João Oliveira",
    "telefone": "11 97777-1234",
    "tipo": "Trabalho"
  }
]
Hospede isso temporariamente em um serviço como Mocky ou json-server.

📸 Demonstração
Lista de Contatos	Swipe para Editar/Excluir	Campo de Busca
Obs: Substitua as imagens acima por screenshots reais do seu app.

📌 Melhorias Futuras
✅ Implementar a funcionalidade de adicionar contatos via FAB.

💾 Integração com banco de dados local (ex: SQLite).

🔄 Sincronização com API real e persistência de dados.

✍️ Tela de edição personalizada.

✅ Autenticação e navegação entre telas.

🤝 Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

📝 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

👤 Autor
Desenvolvido por Maurício Antônio Theodoro Neto
📧 Email: mauricioantonionetinho@gmail.com
