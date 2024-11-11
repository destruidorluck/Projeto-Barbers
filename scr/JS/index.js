document.addEventListener("DOMContentLoaded", function () {
    const calendarTable = document.getElementById("calendar-table");
    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    function renderCalendar(month, year) {
        if (!calendarTable) return;

        calendarTable.innerHTML = `
            <caption><strong>Calendário de Agendamento - ${monthNames[month]} ${year}</strong></caption>
            <tr>
                <th>Dom</th>
                <th>Seg</th>
                <th>Ter</th>
                <th>Qua</th>
                <th>Qui</th>
                <th>Sex</th>
                <th>Sáb</th>
            </tr>
        `;

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let date = 1;
        for (let i = 0; i < 6; i++) {
            const row = document.createElement("tr");

            for (let j = 0; j < 7; j++) {
                const cell = document.createElement("td");

                if (i === 0 && j < firstDay) {
                    cell.textContent = "";
                } else if (date > daysInMonth) {
                    break;
                } else {
                    cell.textContent = date;

                    if (date === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                        cell.classList.add("today");
                    }

                    cell.addEventListener("click", function () {
                        if (cell.classList.contains("highlight")) {
                            cell.classList.remove("highlight");
                        } else {
                            document.querySelectorAll(".highlight").forEach((el) => el.classList.remove("highlight"));
                            cell.classList.add("highlight");
                        }
                    });

                    date++;
                }
                row.appendChild(cell);
            }
            calendarTable.appendChild(row);

            if (date > daysInMonth) {
                break;
            }
        }
    }

    renderCalendar(currentMonth, currentYear);

    // Navegação ativa
    const listaSelecaoNav = document.querySelectorAll(".list");

    listaSelecaoNav.forEach(item => item.classList.remove("ativo"));

    const activeLink = localStorage.getItem("activeLink");
    if (activeLink) {
        listaSelecaoNav.forEach(navItem => {
            const link = navItem.querySelector("a").getAttribute("href");
            if (link === activeLink) {
                navItem.classList.add("ativo");
            }
        });
    }

    listaSelecaoNav.forEach(navItem => {
        navItem.addEventListener("click", function () {
            listaSelecaoNav.forEach(item => item.classList.remove("ativo"));
            navItem.classList.add("ativo");

            const selectedLink = navItem.querySelector("a").getAttribute("href");
            localStorage.setItem("activeLink", selectedLink);
        });
    });

    // Menu de navegação ao rolar
    document.addEventListener("DOMContentLoaded", function () {
        let lastScrollTop = 0;
        const nav = document.querySelector('.nav');
    
        if (nav) {
            // Adiciona a classe "scrolled" quando houver rolagem
            window.addEventListener('scroll', function () {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
                // Quando rolar a página para baixo, fixa a barra no topo
                if (scrollTop > 0) {
                    nav.classList.add('scrolled'); // Aplica estilo fixo no topo
                } else {
                    nav.classList.remove('scrolled'); // Remove estilo fixo ao retornar ao topo
                }
    
                // Função para mostrar/esconder a barra de navegação ao rolar
                if (document.body.scrollHeight > window.innerHeight) {
                    if (scrollTop > lastScrollTop) {
                        nav.classList.add('hide'); // Esconde o menu ao rolar para baixo
                        nav.classList.remove('show');
                    } else {
                        nav.classList.add('show'); // Mostra o menu ao rolar para cima
                        nav.classList.remove('hide');
                    }
                    lastScrollTop = scrollTop;
                }
            });
        }
    });
    
});
