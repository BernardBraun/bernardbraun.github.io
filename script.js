document.addEventListener("DOMContentLoaded", function () {
    const title = document.querySelector('.app_header');
    const textBio = document.querySelector('.text-bio');
    const sectors = document.querySelector('.sectors');
    const body = document.querySelector('body');
    const html = document.querySelector('html');


    /* const color2 = '#2266dd'
     const color3 = '#000'
     body.style.background = `linear-gradient(to bottom, ${color3}, ${color2})`;
     body.style.overflowX = 'hidden';
     body.style.height = '100%'*/


    function updateBio(content) {
        textBio.innerHTML = content;
    }


    title.innerHTML = `
        <div><a href="."><h1 class="nome">Bernard Braun da Silva - Frontend Developer</h1> </a></div>
        <ul class="redes"><a href="https://www.linkedin.com/in/bernard-braun-da-silva/"><li class="linkedin"><i class="fa-brands fa-linkedin"></i></a></li> <li class="github"><a href="https://github.com/BernardBraun"><i class="fa-brands fa-github"></i></a></li></ul>
    `;

    textBio.innerHTML = `
    <p class="boas-vindas">Olá! Que bom te ver por aqui!</p> <br>
    Me chamo Bernard, tenho 35 anos. <br>
    Atualmente sou programador Fullstack Java, com mais de 1 ano de experiência, e estou em transição para atuar em Frontend me especializando no framework React. <br>
    Também tenho mais de 10 anos de experiência como Analista de Infraestrutura de TI. <br>
    Iniciei na área de TI como um hobby quando tinha 14 anos,
    ajudando os amigos a montar os PCs nas lanplays (quando reunia a turma pra jogar em rede),
    mas decidi tornar algo profissional em 2013, quando iniciei meu técnico em informática. <br>
    Após concluído o técnico e percorrido uma longa jornada,
    decidi iniciar minha graduação em Gestão da Tecnologia da Informação, em 2016 e finalizei ela em 2018.<br>
    Porém em 2020 com a pandemia, estava desempregado e com a minha esposa grávida,
    decidi iniciar minha transição de carreira para a área de desenvolvimento,
    com muito incentivo da minha esposa e também querendo dar um futuro melhor para o nosso pequeno.<br> Depois de muitos estudos, atualmente possuo especializações em C#, Java, HTML, CSS, JavaScript,
    TypeScript, ES6, Bootstrap, frameworks React (JS e Native), versionamento de códigos com Git e GitHub.<br>
    Conhecimento em banco de dados PostgreSQL e Microsoft SQL.<br>
    Também possuo conhecimentos sólidos nas principais ferramentas de editoração gráfica,
    como Adobe Illustrator, Adobe Photoshop, Adobe Lightroom e CorelDRAW.<br>
    Possuo também certificação em SCRUM, nível Fundamentals.<br><br>
    Te convido a visitar minhas redes, também os meus links para conhecer mais afundo sobre minhas experiências e projetos, e também para entrar em contato.
    `


    function alertContato() {
        alert(`
        Que bom que você quer meu contato!
        Anote aí antes de apertar o ok!
        bernard.sbraun@gmail.com
        +55 51 98019-5746
        
        Obrigado!!`)
    }

    sectors.innerHTML = `
    <div class="links">    
    <a href="#" id="experienciasLink">Experiências</a> <br><br>
    <a href="#" id="projetosLink">Projetos</a> <br><br>
    <a href="#" id="contatoLink">Contato</a>
    </div>
    `

    const experienciasLink = document.getElementById("experienciasLink");
    const projetosLink = document.getElementById("projetosLink");
    const historiasLink = document.getElementById("historiasLink");
    const contatoLink = document.getElementById("contatoLink");

    function loadExperiences() {
        return fetch('./experiences.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro na resposta da requisição: ${response.status}`);
                }
                return response.json();
            })
            .then(data => data.experiencias)
            .catch(error => {
                console.error('Erro ao carregar as experiências:', error);
                return [];
            });
    }

    experienciasLink.addEventListener("click", async function (event) {
        event.preventDefault();

        try {
            const experiencesData = await loadExperiences();

            if (experiencesData.length === 0) {
                console.log('Nenhuma experiência encontrada.');
                return;
            }

            const experiencesHTML = experiencesData.map(experience => `
                <div class="experiences">
                    <img src="${experience.logo}" alt="logo ${experience.empresa}" class="logo-experience" />
                    <div class="text-container">
                    <h2 class="experiencesTitle">${experience.empresa}</h2>
                    <h4 class="experienceDate">${experience.periodo}</h4>
                    <h4 class="experienceFuncition">${experience.cargo}</h4><br>
                    <p class="experiencesDescription">${experience.descricao}</p>
                    </div>
                </div>
            `).join('');

            updateBio(`
                <h1 class="titulo">Este é meu resumo profissional</h1>
                <br>
                <div class="experiences">
                    ${experiencesHTML}
                </div> 
            `);
            html.style.minHeight = '100vh';
            html.style.backgroundRepeat = 'no-repeat';
            html.style.backgroundAttachment = 'fixed';

        } catch (error) {
            console.error('Erro ao carregar e exibir as experiências:', error);
        }
    });


    function loadProjects() {
        return fetch('./projects.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro na resposta da requisição: ${response.status}`);
                }
                return response.json();
            })
            .then(data => data.projetos)
            .catch(error => {
                console.error('Erro ao carregar as experiências:', error);
                return [];
            });
    }

    projetosLink.addEventListener("click", async function (event) {
        event.preventDefault();
        try {

            const projectsData = await loadProjects();

            if (projectsData.length === 0) {
                console.log('Nenhum projeto encontrado.');
                return;
            }

            const projectsHTML = projectsData.map(project => `
                <div class="projeto-box">
                    <h2 class="projeto-nome">${project.projeto}</h2>
                    <img class="projeto-image" src="${project.imagem}" alt="${project.projeto}">
                    <p class="resumo-projeto">${project.resumo}</p><br>
                    <div class="tecnologias">
                        <p>Tecnologias utilizadas:</p><br>
                        ${project.tecnologias.map(tecnologia => `<img class="image-technology" src="${tecnologia}" alt="Tecnologia">`).join('')}
                    </div>
                </div>
                <hr>
                <br><br>
            `).join('');

            updateBio(`
                <h1 class="titulo-projetos">Estes são alguns de meus projetos</h1>
                ${projectsHTML}
            `);
        } catch (error) {
            console.error('Erro ao carregar a sessão projetos:', error)
        }
    })

    contatoLink.addEventListener("click", function (event) {
        event.preventDefault();
        html.style.height = '100%'
        updateBio(`
        <p class="boas-vindas">Olá! Que bom te ver por aqui!</p> <br>
        Me chamo Bernard, tenho 35 anos. <br>
        Atualmente sou programador Fullstack Java, com mais de 1 ano de experiência, e estou em transição para atuar em Frontend me especializando no framework React. <br>
        Também tenho mais de 10 anos de experiência como Analista de Infraestrutura de TI. <br>
        Iniciei na área de TI como um hobby quando tinha 14 anos,
        ajudando os amigos a montar os PCs nas lanplays (quando reunia a turma pra jogar em rede),
        mas decidi tornar algo profissional em 2013, quando iniciei meu técnico em informática. <br>
        Após concluído o técnico e percorrido uma longa jornada,
        decidi iniciar minha graduação em Gestão da Tecnologia da Informação, em 2016 e finalizei ela em 2018.<br>
        Porém em 2020 com a pandemia, estava desempregado e com a minha esposa grávida,
        decidi iniciar minha transição de carreira para a área de desenvolvimento,
        com muito incentivo da minha esposa e também querendo dar um futuro melhor para o nosso pequeno.<br> Depois de muitos estudos, atualmente possuo especializações em C#, Java, HTML, CSS, JavaScript,
        TypeScript, ES6, Bootstrap, frameworks React (JS e Native), versionamento de códigos com Git e GitHub.<br>
        Conhecimento em banco de dados PostgreSQL e Microsoft SQL.<br>
        Também possuo conhecimentos sólidos nas principais ferramentas de editoração gráfica,
        como Adobe Illustrator, Adobe Photoshop, Adobe Lightroom e CorelDRAW.<br>
        Possuo também certificação em SCRUM, nível Fundamentals.<br><br>
        Te convido a visitar minhas redes, também os meus links para conhecer mais afundo sobre minhas experiências e projetos, e também para entrar em contato.
        `)
        setTimeout(alertContato, 50);
    })

});
