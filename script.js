document.addEventListener("DOMContentLoaded", function() {
    const title = document.querySelector('.app_header');
    const footer = document.querySelector('.app_footer');
    const image = new Image();
    const textBio = document.querySelector('.text-bio');

    image.onload = function() {
        document.body.style.backgroundImage = `url(${image.src})`;
        document.body.style.backgroundSize = 'cover';
    }

    image.src = "/images/background.jpg";

    title.innerHTML = `
        <div><h1 class="nome">Bernard Braun da Silva - Frontend Developer</h1></div>
        <ul class="redes"><a href="https://www.linkedin.com/in/bernard-braun-da-silva/"><li class="linkedin"><i class="fa-brands fa-linkedin"></i></a></li> <li class="github"><a href="https://github.com/BernardBraun"><i class="fa-brands fa-github"></i></a></li></ul>
    `;

    footer.innerHTML = `
            <p>Desenvolvido por Bernard Braun da Silva</p>
    `;

    textBio.innerHTML = `
    Olá! Que bom te ver por aqui! <br>
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
    Te convido a visitar minhas redes, LinkedIn e GitHub para conhecer minhas experiências e meus projetos.
    `
});
