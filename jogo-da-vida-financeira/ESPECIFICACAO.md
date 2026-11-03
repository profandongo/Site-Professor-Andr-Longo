# JOGO DA VIDA FINANCEIRA

## Especificação funcional e técnica — Versão 2.1

**Público-alvo:** estudantes de 9 e 10 anos  
**Tecnologia:** HTML, CSS, JavaScript, servidor e banco de dados compartilhado  
**Duração simulada:** 18 anos  
**Duração total:** 36 turnos semestrais  
**Organização pedagógica:** flexível, controlada pelo administrador  
**Idioma:** português brasileiro  
**Moeda:** real brasileiro (BRL)

---

# PARTE I — PRINCÍPIOS GERAIS

## 1. Apresentação

O Jogo da Vida Financeira é uma aplicação educacional na qual estudantes simulam 18 anos de decisões financeiras.

Cada participante administra uma carteira individual, investe recursos, escolhe uma profissão, enfrenta acontecimentos aleatórios e pode realizar oportunidades de desenvolvimento profissional.

O sistema será composto por duas interfaces principais:

1. **Painel do administrador:** permite organizar turmas, criar carteiras, controlar os turnos, disponibilizar mecânicas e acompanhar o ranking de patrimônio.
2. **Interface do jogador:** permite consultar a carteira individual e tomar decisões financeiras dentro das mecânicas disponibilizadas pelo administrador.

A aplicação deverá funcionar de maneira compartilhada, permitindo que administrador e jogadores utilizem dispositivos diferentes.

O estado financeiro das carteiras deverá ser armazenado centralmente, evitando que as informações existam exclusivamente no navegador do jogador.

## 2. Princípios de funcionamento

O jogo obedecerá aos seguintes princípios:

- Cada carteira pertence a uma turma.
- Cada turma possui um turno atual compartilhado.
- O administrador decide quais mecânicas estão disponíveis em cada turma.
- As mecânicas não serão ativadas automaticamente com base no número da aula ou do turno.
- O administrador controla quando termina a etapa de decisões dos jogadores.
- Todos os jogadores de uma mesma turma recebem os mesmos rendimentos percentuais de mercado em cada turno.
- Os acontecimentos individuais e profissionais são sorteados separadamente para cada carteira.
- As regras financeiras são aplicadas pelo servidor.
- O jogador pode assumir riscos financeiros, inclusive decidindo não manter uma reserva de emergência.
- Não haverá exigência de login para os estudantes.

## 3. Organização temporal

Cada turno representa seis meses.

O jogo terá 36 turnos, totalizando 18 anos.

A quantidade total de turnos continuará fixa, mas sua distribuição entre aulas será livre.

Por exemplo, o professor poderá realizar quatro turnos em uma aula, oito na seguinte e três em outra.

O sistema não deverá exigir a conclusão de seis turnos para liberar um novo conjunto de mecânicas.

O painel do jogador mostrará o turno atual e o tempo simulado correspondente, sem associá-los obrigatoriamente a uma aula.

---

# PARTE II — ORGANIZAÇÃO PEDAGÓGICA

## 4. Progressão sugerida

A introdução dos conteúdos continuará seguindo uma progressão pedagógica recomendada.

Entretanto, a sequência abaixo será apenas uma referência para o professor.

| Etapa pedagógica | Conceitos e mecânicas sugeridos |
|---|---|
| Primeiros investimentos | Capital inicial, CIM, Saldo que Rende, renda fixa e renda variável |
| Escolhas profissionais | Profissões, formação, promoções e desemprego |
| Proteção financeira | Reserva de emergência, acontecimentos, seguros e endividamento |
| Investindo no futuro | Especialização, cursos, mudança de cidade e equipamentos |
| Consolidação | Continuidade das decisões e combinação das mecânicas |
| Encerramento | Conclusão dos 36 turnos e análise dos resultados |

O administrador poderá seguir essa sequência, alterá-la ou disponibilizar diferentes mecânicas em uma mesma aula.

## 5. Ativação manual

Nenhuma mecânica opcional deverá depender de condições como:

- Estar no turno 7.
- Estar no turno 13.
- Estar no turno 19.
- Estar na segunda, terceira ou quarta aula.

Em vez disso, cada turma terá uma configuração de mecânicas habilitadas.

O administrador poderá modificar essa configuração durante o andamento do jogo.

As regras de elegibilidade individuais continuarão valendo. Por exemplo, disponibilizar Especialização não significa que jogadores ainda em formação poderão adquiri-la.

### 5.1. Efeitos da desativação

Desativar uma mecânica deverá impedir novas ações relacionadas a ela, mas não apagar resultados anteriores.

Exemplos:

- Desativar o CDB impede novas aplicações, mas as existentes continuam rendendo até o vencimento.
- Desativar seguros impede novas contratações, mas um seguro já contratado continua válido até terminar seu semestre.
- Desativar oportunidades impede novas aquisições, mas oportunidades em andamento continuam até serem concluídas ou canceladas pelas regras financeiras.
- Desativar desemprego impede novos sorteios, mas não altera desempregos já processados.
- Desativar escolha profissional não apaga as profissões selecionadas nem interrompe automaticamente a formação.

As configurações utilizadas em um turno serão registradas para permitir reproduzir seus resultados.

---

# PARTE III — ACESSO, TURMAS E CARTEIRAS

## 6. Tela inicial pública

A página inicial do site deverá apresentar exclusivamente a seleção de turmas.

Não haverá:

- Botão de iniciar partida.
- Botão de continuar partida.
- Cadastro de jogador.
- Campo para identificador.
- Campo de semente aleatória.
- Instruções iniciais obrigatórias.
- Tela de autenticação do aluno.

Cada turma deverá aparecer como um cartão clicável, utilizando seu nome cadastrado pelo administrador.

Ao selecionar uma turma, o visitante acessará a lista de carteiras daquela turma.

## 7. Seleção da carteira

Dentro da turma serão apresentadas as carteiras com os nomes de exibição dos alunos.

Exemplo:

**Turma: Matemática — 7º Ano A**

- Carteira de Ana
- Carteira de Bruno
- Carteira de Carolina
- Carteira de Daniel

Ao selecionar uma carteira, o jogador será direcionado diretamente ao painel financeiro correspondente.

Não será necessário informar nome, senha, código ou qualquer outra identificação.

A carteira será criada previamente pelo administrador.

## 8. Identificação interna

Embora o acesso seja realizado por nomes, o sistema deverá utilizar identificadores internos únicos.

Cada turma terá um identificador próprio.

Cada carteira também terá um identificador exclusivo, associado à turma.

Os nomes de exibição poderão ser alterados pelo administrador sem perder o histórico financeiro da carteira.

Os identificadores internos não precisarão ser mostrados aos estudantes.

## 9. Persistência compartilhada

Os dados deverão permanecer armazenados em um banco central.

Se um aluno abrir sua carteira em outro dispositivo, deverá visualizar os mesmos saldos, investimentos e oportunidades.

Quando o administrador alterar o turno ou liberar os acontecimentos, as carteiras da turma deverão ser atualizadas sem necessidade de reiniciar o jogo.

A implementação poderá utilizar comunicação em tempo real ou atualização periódica, desde que mantenha consistência entre os dispositivos.

---

# PARTE IV — PAINEL DO ADMINISTRADOR

## 10. Visão geral

O painel do administrador será uma interface separada da interface dos jogadores.

Deverá permitir:

- Criar, editar e organizar turmas.
- Criar, editar e organizar carteiras de alunos.
- Ativar ou desativar mecânicas por turma.
- Controlar o andamento dos turnos.
- Encerrar a etapa de decisões e liberar os acontecimentos.
- Acompanhar os patrimônios das carteiras.
- Visualizar o ranking da turma.

O administrador não precisará acessar individualmente cada carteira para acompanhar o progresso geral.

## 11. Gerenciamento de turmas

O administrador poderá:

1. Criar uma turma.
2. Definir seu nome.
3. Alterar o nome posteriormente.
4. Cadastrar carteiras.
5. Consultar a quantidade de carteiras.
6. Selecionar a turma que deseja administrar.

Cada turma deverá possuir estado independente.

Por exemplo, uma turma poderá estar no turno 12, enquanto outra estará no turno 5.

A ativação das mecânicas, os rendimentos de mercado, as carteiras e o ranking também serão independentes entre turmas.

## 12. Gerenciamento de alunos e carteiras

Dentro de cada turma, o administrador poderá cadastrar alunos informando seus nomes de exibição.

O sistema criará automaticamente uma carteira financeira correspondente.

Cada carteira começará com:

- Capital inicial de R$ 1.000.
- CIM mensal de R$ 100.
- Nenhuma profissão escolhida.
- Nenhum investimento contratado.
- Nenhum seguro.
- Nenhuma oportunidade.
- Nenhuma dívida.

O administrador poderá editar nomes e consultar o estado das carteiras.

Uma carteira criada depois de a turma começar não deverá avançar automaticamente pelos turnos anteriores. Ela deverá permanecer identificada como atrasada até que o administrador escolha uma forma de regularizar sua participação. Essa operação deverá ser explícita, para não criar patrimônios artificialmente.

## 13. Configuração das mecânicas

Cada turma possuirá controles de disponibilidade das mecânicas.

### 13.1. Investimentos

O administrador poderá ativar ou desativar individualmente:

| Mecânica | Controle |
|---|---|
| CDB 1 Ano | Ativar/desativar |
| Tesouro Prefixado | Ativar/desativar |
| Tesouro IPCA+ | Ativar/desativar |
| Fundo Diversificado | Ativar/desativar |
| Fundo de Tecnologia | Ativar/desativar |
| Ações de Empresa Inovadora | Ativar/desativar |

O Saldo que Rende continuará disponível permanentemente, porque é a conta principal.

### 13.2. Profissões

Controles independentes para:

- Escolha profissional.
- Sorteios de desemprego.
- Sorteios de promoção.

A desativação dos sorteios profissionais não modificará a CIM já conquistada.

A formação profissional continuará progredindo depois de uma profissão ter sido escolhida.

### 13.3. Acontecimentos e seguros

Controles para:

- Acontecimentos gerais.
- Seguro Saúde.
- Seguro Automóvel.
- Seguro Residencial.

Os seguros poderão ser disponibilizados individualmente.

Suas indenizações dependerão da ocorrência dos respectivos acontecimentos.

### 13.4. Oportunidades

Controles individuais para:

- Especialização.
- Cursos e Certificações.
- Mudança de Cidade.
- Equipamentos Profissionais.

### 13.5. Renegociação

A renegociação de dívidas será uma ação disponibilizada pelo administrador, sem associação obrigatória ao encerramento de uma aula.

Quando liberada, permitirá que jogadores endividados solicitem o perdão dos juros pendentes uma vez durante aquela liberação.

O principal da dívida continuará devido.

## 14. Mecânicas permanentes

Algumas operações fazem parte do funcionamento central do jogo e não deverão ser desativadas:

- Passagem do tempo.
- Crédito da CIM.
- Saldo que Rende.
- Cálculo dos rendimentos de aplicações já existentes.
- Vencimento de investimentos.
- Cálculo patrimonial.
- Registro de dívidas.
- Juros sobre dívidas.
- Pagamento automático de dívidas.
- Salvamento dos resultados.
- Controle de turnos.

Essas operações serão executadas conforme as condições financeiras existentes, mesmo quando determinadas mecânicas opcionais estiverem desativadas.

## 15. Controle dos turnos

Cada turma terá um único turno ativo.

O administrador controlará seu andamento.

### 15.1. Etapa de decisões — B

Durante a Etapa B, os jogadores poderão consultar suas carteiras e tomar as decisões permitidas.

O administrador visualizará quais carteiras já registraram suas decisões.

As decisões poderão ser modificadas até o administrador encerrar a etapa.

Os valores serão validados e confirmados pelo servidor no fechamento da Etapa B.

### 15.2. Liberação dos acontecimentos — C

O administrador deverá possuir um comando:

**Encerrar decisões e liberar acontecimentos**

Quando esse comando for acionado:

1. A turma deixará de aceitar alterações financeiras referentes ao turno.
2. As decisões registradas serão consolidadas.
3. Os sorteios profissionais elegíveis serão processados.
4. Os acontecimentos gerais habilitados serão sorteados.
5. As coberturas dos seguros serão calculadas.
6. O fechamento financeiro será realizado.
7. Os resultados serão registrados nas carteiras.

Todos os jogadores da turma serão processados de maneira consistente.

O administrador poderá liberar os acontecimentos mesmo que alguma carteira não tenha enviado decisões. Nesse caso, a carteira continuará com seus recursos não realocados e as aplicações anteriores seguirão suas regras normais.

### 15.3. Avanço para o próximo turno

Depois do processamento dos acontecimentos, o administrador poderá iniciar o próximo turno.

O jogo não deverá avançar automaticamente enquanto o administrador não autorizar.

A turma permanecerá no turno recém-processado até a liberação seguinte.

No início do próximo turno, os jogadores poderão tomar novas decisões.

### 15.4. Integridade do processamento

Os comandos administrativos deverão ser idempotentes.

Isso significa que clicar duas vezes em "Liberar acontecimentos" não poderá gerar dois desempregos, dois créditos de CIM ou dois cálculos de rendimento para o mesmo semestre.

O servidor deverá identificar turnos já processados e impedir sua execução duplicada.

## 16. Ranking da turma

O painel do administrador deverá apresentar um ranking ordenado pelo patrimônio dos alunos.

O ranking deverá conter:

| Posição | Aluno | Profissão | Patrimônio |
|---|---|---|---|
| 1º | Nome do aluno | Profissão | R$ ... |
| 2º | Nome do aluno | Profissão | R$ ... |
| 3º | Nome do aluno | Profissão | R$ ... |

Os valores deverão ser calculados pelo sistema, não informados manualmente.

**Patrimônio = Saldo que Rende + investimentos de renda fixa atualizados + investimentos de renda variável atualizados.**

Como o Saldo que Rende poderá ser negativo, as dívidas já estarão deduzidas desse cálculo.

Não deverá ocorrer desconto duplicado da dívida.

O ranking deverá atualizar após os fechamentos financeiros e refletir a posição de cada carteira.

Não será necessário mostrar o ranking aos estudantes.

---

# PARTE V — PAINEL DO JOGADOR

## 17. Estrutura visual

A interface do jogador deverá ser simples e concentrada nas informações necessárias para tomar decisões.

O painel será a principal tela de interação durante toda a experiência.

Não haverá uma sequência obrigatória de telas de conclusão de turno ou de aula.

## 18. Informações exibidas

O painel deverá apresentar:

| Informação | Descrição |
|---|---|
| Nome do jogador | Nome de exibição cadastrado pelo administrador |
| Profissão | Profissão selecionada, quando existir |
| Turno | Número do turno atual |
| Tempo simulado | Tempo transcorrido em anos e semestres |
| CIM mensal vigente | Capacidade de investimento mensal atual |
| Saldo líquido disponível | Dinheiro disponível, podendo ser negativo |
| Reserva financeira indicada | Valor sugerido de reserva, sem obrigatoriedade |

A reserva financeira indicada será apresentada como uma orientação de planejamento.

Ela não deverá impedir investimentos.

## 19. Área de investimentos

O painel deverá apresentar os investimentos ativos individualmente.

Cada aplicação deverá conter:

- Nome da modalidade.
- Valor originalmente aplicado.
- Valor atualizado.
- Prazo restante, quando houver.
- Situação da aplicação.

Exemplos de situação:

- Ativo.
- Em carência.
- Próximo do vencimento.
- Aguardando liquidação.

Durante a etapa de decisões, o jogador também poderá registrar novas aplicações nas modalidades habilitadas pelo administrador.

## 20. Área de oportunidades

O painel deverá apresentar as oportunidades, com seus respectivos estados:

- Disponível.
- Em andamento.
- Concluída.
- Cancelada.

Cada oportunidade poderá mostrar seu custo, duração e benefício.

Oportunidades desativadas pelo administrador não deverão oferecer um botão de aquisição.

Oportunidades já contratadas deverão continuar aparecendo, mesmo quando novas contratações estiverem desabilitadas.

## 21. Informações e telas que não deverão existir

A interface do aluno não deverá possuir:

- Tela de criação de partida.
- Tela de login.
- Tela de cadastro pessoal.
- Tela de configuração de sementes.
- Seção de histórico de movimentações.
- Painel separado de disponibilidade financeira.
- Painel de acompanhamento obrigatório da meta de reserva.
- Indicador separado de situação de endividamento.
- Informação técnica sobre prazo máximo até o turno 36.
- Indicadores permanentes de validação de valores digitados.
- Tela detalhada de fechamento de turno.
- Tela de encerramento de aula.
- Tela obrigatória de encerramento do jogo.
- Perguntas de reflexão.

As validações continuarão sendo executadas pelo servidor.

Quando uma operação for inválida, a interface poderá apresentar uma mensagem contextual curta, sem criar um painel adicional de validações.

## 22. Exibição dos acontecimentos

Os acontecimentos profissionais e gerais poderão ser comunicados por notificações ou pequenos cartões sobrepostos ao painel.

Exemplos:

- "Você recebeu uma promoção!"
- "Você ficou desempregado neste semestre."
- "Seu seguro cobriu 80% da despesa."
- "Sua especialização foi concluída."

Depois da apresentação, o jogador permanecerá no mesmo painel financeiro, com os valores atualizados.

Não será necessário apresentar uma tela separada com todas as movimentações do turno.

## 23. Espera pela liberação do administrador

Enquanto a Etapa B estiver aberta, os jogadores poderão modificar suas decisões.

Depois que o administrador a encerrar, os controles de decisão ficarão bloqueados.

O painel poderá apresentar uma mensagem discreta informando que as decisões foram encerradas.

Após o processamento financeiro, os valores serão atualizados.

O próximo turno só ficará disponível quando o administrador autorizar.

---

# PARTE VI — REGRAS FINANCEIRAS

## 24. Capital inicial

Cada carteira começará com:

**Capital inicial: R$ 1.000.**

A CIM inicial será de R$ 100 por mês.

Enquanto o jogador não escolher uma profissão, esses valores serão mantidos.

## 25. Capacidade de Investimento Mensal

A CIM representa a renda disponível após as despesas habituais.

O crédito semestral corresponderá a:

**Crédito da CIM = CIM efetiva mensal × 6.**

O valor será creditado ao final do turno.

A CIM estrutural representa a capacidade mensal permanente.

A CIM efetiva poderá ser alterada temporariamente por desemprego ou por custos de oportunidades em andamento.

## 26. Reserva financeira indicada

A reserva sugerida corresponderá a:

**Reserva indicada = 12 × CIM estrutural mensal.**

A indicação estará disponível depois da conclusão da formação profissional.

Antes disso, o campo poderá exibir uma orientação simples de que o jogador ainda não possui uma meta profissional definida.

A reserva será apenas uma recomendação.

O jogador poderá:

- Manter dinheiro equivalente à reserva indicada.
- Manter um valor inferior.
- Não manter reserva alguma.
- Investir todo seu saldo positivo.

O sistema não deverá bloquear novas aplicações por falta de reserva.

Essa liberdade é intencional e constitui parte do objetivo pedagógico do jogo.

## 27. Saldo que Rende

O Saldo que Rende será a conta principal.

Seu rendimento será de **2% ao semestre**, enquanto positivo.

O saldo receberá:

- CIM.
- Vencimentos de renda fixa.
- Liquidações de renda variável.
- Ganhos financeiros de acontecimentos.

Também será utilizado para despesas, seguros, investimentos e oportunidades.

Quando negativo, representará uma dívida.

## 28. Renda fixa

| Modalidade | Prazo | Rendimento por semestre |
|---|---|---:|
| CDB 1 Ano | 2 turnos | +2,5% |
| Tesouro Prefixado | 4 turnos | +3% |
| Tesouro IPCA+ | 6 turnos | +3,5% |

Os investimentos receberão rendimentos compostos.

Não haverá resgate antecipado.

Uma aplicação contratada no turno T, com prazo P, vencerá ao final do turno T + P − 1.

O dinheiro retornará ao Saldo que Rende no início do turno seguinte.

Aplicações com vencimento além do turno 36 não serão permitidas.

Aplicações que vencerem exatamente ao final do turno 36 integrarão o patrimônio final.

## 29. Renda variável

| Modalidade | Sorteios | Faixa por sorteio | Bônus |
|---|---:|---|---:|
| Fundo Diversificado | 9 | −10% a +10% | +4% |
| Fundo de Tecnologia | 5 | −30% a +30% | +5% |
| Ações de Empresa Inovadora | 3 | −50% a +50% | +6% |

O rendimento será calculado pela média dos sorteios independentes acrescida do bônus.

Os rendimentos esperados serão de 4%, 5% e 6% por semestre, respectivamente.

Os resultados de mercado serão compartilhados por todos os jogadores da mesma turma.

Cada investimento em renda variável terá duração de um turno.

O valor atualizado será liquidado no início do turno seguinte.

Não haverá dividendos nem resgates extraordinários durante acontecimentos.

## 30. Profissões

As nove profissões permanecerão com os parâmetros balanceados.

| Profissão | Formação | CIM profissional | Desemprego | Promoção |
|---|---|---:|---:|---:|
| Medicina | 6 anos | R$ 2.300 | 5% | 8% |
| Tecnologia | 4 anos | R$ 2.100 | 11% | 12% |
| Engenharia | 5 anos | R$ 2.000 | 8% | 12% |
| Academia | 10 anos | R$ 2.400 | 0% | 8% |
| Formação Técnica | 2 anos | R$ 1.650 | 9% | 7% |
| Professor(a) | 4 anos | R$ 1.650 | 4% | 6% |
| Enfermagem | 5 anos | R$ 2.000 | 7% | 9% |
| Direito | 5 anos | R$ 2.150 | 9% | 11% |
| Comércio e Vendas | Sem formação obrigatória | R$ 1.650 | 12% | 5% |

### 30.1. CIM durante os estudos

| Profissão | Progressão da CIM |
|---|---|
| Medicina | R$ 200/mês durante 6 anos |
| Tecnologia | R$ 200/mês por 2 anos; R$ 400/mês por 2 anos |
| Engenharia | R$ 400/mês por 5 anos |
| Academia | R$ 200/mês por 2 anos; R$ 300/mês por 2 anos; R$ 800/mês por 2 anos; R$ 1.200/mês por 4 anos |
| Formação Técnica | R$ 350/mês por 2 anos |
| Professor(a) | R$ 250/mês por 2 anos; R$ 450/mês por 2 anos |
| Enfermagem | R$ 250/mês por 3 anos; R$ 500/mês por 2 anos |
| Direito | R$ 200/mês por 3 anos; R$ 500/mês por 2 anos |
| Comércio e Vendas | R$ 1.650/mês imediatamente após a escolha |

### 30.2. Início da formação

A formação começará no turno em que o jogador selecionar sua profissão.

Não haverá obrigatoriedade de escolha no turno 7.

Para profissões com formação, cada ano corresponderá a dois turnos.

Comércio e Vendas não exigirá formação.

Os sorteios de desemprego e promoção serão aplicáveis somente depois da conclusão profissional e quando estiverem habilitados pelo administrador.

A flexibilidade de ativação pode alterar os resultados médios anteriormente simulados, que consideravam a escolha profissional no turno 7.

## 31. Promoções

Uma promoção aumentará permanentemente a CIM estrutural em 10%.

O aumento começará no turno seguinte.

Promoções sucessivas serão acumuladas multiplicativamente.

Não haverá limite de promoções.

O jogador desempregado não poderá ser promovido no mesmo semestre.

## 32. Desemprego

Quando o desemprego estiver habilitado, cada jogador formado e sem dívidas estará sujeito à probabilidade de sua profissão.

A penalidade será:

**CIM efetiva mensal = −2 × CIM estrutural.**

O desemprego durará um semestre.

O jogador retornará à sua CIM estrutural no turno seguinte.

Não poderá receber promoção ou bônus profissional no semestre em que estiver desempregado.

Oportunidades ainda em andamento serão canceladas.

Enquanto houver dívida, não ocorrerão novos sorteios de desemprego.

## 33. Acontecimentos gerais

Quando habilitados, os acontecimentos terão as seguintes probabilidades e impactos:

| Acontecimento | Probabilidade | Impacto |
|---|---:|---|
| Doença inesperada | 8% | −R$ 1.800 a −R$ 3.000 |
| Acidente de carro | 8% | −R$ 1.500 a −R$ 2.500 |
| Conserto emergencial em casa | 8% | −R$ 900 a −R$ 1.500 |
| Roubo de celular | 6% | −R$ 600 a −R$ 1.000 |
| Emergência familiar | 6% | −R$ 1.000 a −R$ 2.000 |
| Pequeno conserto doméstico | 8% | −R$ 150 a −R$ 350 |
| Consulta ou medicamento inesperado | 8% | −R$ 100 a −R$ 260 |
| Perda de objeto pessoal | 6% | −R$ 50 a −R$ 250 |
| Presente em dinheiro | 6% | +R$ 200 a +R$ 400 |
| Reembolso inesperado | 6% | +R$ 100 a +R$ 300 |
| Bônus no trabalho | 8% | +R$ 600 a +R$ 1.000 |
| Nenhum acontecimento | 22% | R$ 0 |

Cada jogador terá um acontecimento geral por turno habilitado.

Os valores serão sorteados em incrementos de R$ 10.

O bônus no trabalho exigirá formação concluída e situação de emprego ativa.

Quando um acontecimento negativo for sorteado para um jogador já endividado, será substituído por "Nenhum acontecimento", sem novo sorteio.

Acontecimentos positivos continuarão disponíveis.

## 34. Seguros

| Seguro | Cobertura | Preço por semestre |
|---|---|---:|
| Saúde | 80% do prejuízo por doença inesperada | R$ 185 |
| Automóvel | 80% do prejuízo por acidente de carro | R$ 155 |
| Residencial | 80% do prejuízo por conserto emergencial em casa | R$ 95 |

A contratação será opcional e válida por um turno.

O prêmio será pago no início do semestre.

A contratação não poderá criar dívida.

Não haverá seguro-desemprego.

## 35. Dívidas

O Saldo que Rende poderá ficar negativo.

Quando isso ocorrer, haverá uma dívida sujeita a juros de 50% ao semestre.

Os juros serão calculados antes do crédito da CIM no fechamento.

Os recebimentos positivos serão utilizados automaticamente para quitar dívidas.

A prioridade será:

1. Juros pendentes.
2. Principal.

Enquanto houver dívida:

- Não poderão ser realizadas novas aplicações voluntárias.
- Não haverá novos sorteios de desemprego.
- Acontecimentos gerais negativos serão bloqueados.
- Oportunidades em andamento serão canceladas.
- Os juros continuarão incidindo.

O sistema manterá internamente um registro separado de principal, juros, pagamentos e eventuais perdões, embora não precise apresentar esse histórico no painel do aluno.

## 36. Renegociação

Quando o administrador liberar a renegociação, jogadores endividados poderão perdoar os juros ainda não pagos.

O principal permanecerá devido.

Juros já pagos não serão devolvidos.

Cada liberação permitirá uma renegociação por carteira.

A liberação da renegociação não estará vinculada a números específicos de turno ou aula.

## 37. Oportunidades de longo prazo

| Oportunidade | Custo | Duração | Benefício |
|---|---|---|---|
| Especialização | R$ 1.000/mês | 4 turnos | +35% na CIM |
| Cursos e Certificações | R$ 400/mês | 4 turnos | +14% na CIM |
| Mudança de Cidade | R$ 14.000 | 1 turno | +R$ 300/mês na CIM |
| Equipamentos Profissionais | R$ 8.000 | Imediata | +R$ 180/mês na CIM |

### 37.1. Requisitos

As oportunidades poderão ser adquiridas quando:

- Estiverem habilitadas pelo administrador.
- O jogador tiver concluído sua formação.
- Não houver dívida.
- A oportunidade ainda não tiver sido utilizada.
- Houver recursos suficientes para o pagamento inicial exigido.

**Não será obrigatório manter uma reserva de emergência para adquirir oportunidades.**

### 37.2. Especialização

Custo de R$ 1.000 mensais durante quatro turnos.

O custo será descontado da CIM efetiva durante os semestres de formação.

Após a conclusão, a CIM estrutural aumentará permanentemente em 35%, com efeito no turno seguinte.

### 37.3. Cursos e Certificações

Custo de R$ 400 mensais durante quatro turnos.

Após a conclusão, a CIM estrutural aumentará permanentemente em 14%, com efeito no turno seguinte.

### 37.4. Mudança de Cidade

Pagamento de R$ 14.000 na contratação.

A oportunidade permanecerá em andamento durante um semestre.

Se concluída, aumentará permanentemente a CIM estrutural em R$ 300 mensais a partir do turno seguinte.

### 37.5. Equipamentos Profissionais

Pagamento de R$ 8.000 na contratação.

A oportunidade será concluída imediatamente.

Concederá aumento permanente de R$ 180 mensais na CIM estrutural a partir do turno seguinte.

### 37.6. Cancelamento

O desemprego ou endividamento cancelará oportunidades ainda em andamento.

Os valores pagos não serão devolvidos.

Oportunidades canceladas não poderão ser adquiridas novamente.

Benefícios de oportunidades já concluídas permanecerão válidos.

### 37.7. Acumulação

Aumentos percentuais serão calculados sobre a CIM estrutural vigente.

Benefícios permanentes poderão ser acumulados.

Quando vários benefícios entrarem em vigor simultaneamente, os percentuais serão aplicados primeiro e, em seguida, os aumentos fixos.

---

# PARTE VII — PROCESSAMENTO TÉCNICO

## 38. Máquina de estados da turma

Cada turma deverá possuir um estado de turno controlado pelo servidor.

Os principais estados serão:

| Estado | Comportamento |
|---|---|
| Decisões abertas | Jogadores podem consultar carteiras e registrar decisões |
| Decisões encerradas | Servidor bloqueia novas alterações daquele turno |
| Processando resultados | Servidor realiza sorteios e cálculos financeiros |
| Aguardando próximo turno | Resultados disponíveis; somente administrador pode avançar |
| Jogo concluído | Turno 36 processado; carteiras permanecem consultáveis |

O administrador será responsável pelas transições que encerram as decisões e iniciam um novo turno.

O processamento financeiro acontecerá automaticamente, apenas uma vez para cada turma e turno.

## 39. Sequência financeira

Ao fechar a Etapa B, o servidor deverá:

1. Consolidar as decisões de investimento, seguros e oportunidades.
2. Debitar os pagamentos voluntários autorizados.
3. Verificar os sorteios profissionais habilitados.
4. Aplicar desemprego ou registrar promoções futuras.
5. Cancelar oportunidades em andamento quando ocorrer desemprego.
6. Sortear acontecimentos gerais quando habilitados.
7. Aplicar coberturas de seguro e efeitos financeiros.
8. Cancelar oportunidades em andamento se surgir endividamento.
9. Calcular rendimentos de renda fixa e renda variável.
10. Calcular o rendimento positivo do Saldo que Rende ou os juros sobre dívidas.
11. Calcular a CIM efetiva do semestre.
12. Creditar a CIM ou registrar a penalidade negativa.
13. Amortizar automaticamente dívidas quando houver créditos positivos.
14. Atualizar o progresso das oportunidades.
15. Registrar conclusões e benefícios para o turno seguinte.
16. Atualizar o patrimônio.
17. Salvar o resultado e atualizar o ranking.

Ao abrir o próximo turno:

1. Aplicar aumentos de CIM programados.
2. Atualizar o progresso da formação profissional.
3. Transferir investimentos vencidos ao Saldo que Rende.
4. Liquidar a renda variável do turno anterior.
5. Amortizar dívidas com os recebimentos correspondentes.
6. Atualizar a reserva financeira indicada.
7. Disponibilizar as decisões permitidas pelas configurações da turma.

## 40. Precisão monetária

Os cálculos deverão utilizar centavos inteiros sempre que possível.

Os resultados monetários serão arredondados matematicamente para cima até o próximo centavo.

Exemplos:

- R$ 1,234 → R$ 1,24.
- R$ 2,501 → R$ 2,51.
- −R$ 1,234 → −R$ 1,23.

Os percentuais de sorteios deverão preservar sua precisão até o momento de aplicar o rendimento ao valor investido.

## 41. Sorteios compartilhados e individuais

Os resultados de mercado dependerão de:

- Identificador da turma.
- Semente da turma.
- Turno.
- Modalidade de investimento.

Os sorteios pessoais dependerão adicionalmente do identificador da carteira e do tipo de acontecimento.

Os resultados deverão ser determinísticos ou armazenados após o processamento, garantindo que uma atualização da página não provoque novos sorteios.

---

# PARTE VIII — DADOS E ARQUITETURA

## 42. Estruturas de dados principais

O banco de dados deverá contemplar, no mínimo:

### Turma

- Identificador.
- Nome.
- Turno atual.
- Estado atual do turno.
- Semente de mercado.
- Configuração de mecânicas.
- Estado de conclusão.

### Carteira

- Identificador.
- Turma.
- Nome de exibição.
- Profissão.
- Estado de formação.
- CIM estrutural.
- CIM efetiva.
- Saldo que Rende.
- Patrimônio total.
- Estado de endividamento.
- Participação no turno.

### Investimento

- Identificador.
- Carteira.
- Modalidade.
- Valor aplicado.
- Valor atualizado.
- Turno de contratação.
- Turno de vencimento.
- Situação.

### Oportunidade

- Identificador.
- Carteira.
- Tipo.
- Estado.
- Turno de início.
- Turnos concluídos.
- Custo acumulado.
- Benefício programado ou concedido.

### Movimentação financeira

- Identificador.
- Carteira.
- Turno.
- Tipo da movimentação.
- Valor.
- Saldo resultante.
- Identificador da operação que originou a movimentação.

### Decisões do turno

- Carteira.
- Turno.
- Aplicações planejadas.
- Seguros escolhidos.
- Oportunidades escolhidas.
- Última atualização.
- Situação da confirmação.

### Resultado do turno

- Carteira.
- Turno.
- Sorteios processados.
- Rendimentos.
- Alterações profissionais.
- Valores financeiros.
- Patrimônio resultante.

O histórico financeiro continuará existindo internamente para cálculos, auditoria e correção de problemas, mas não será apresentado como uma seção no painel do jogador.

## 43. Arquitetura recomendada

A aplicação deverá possuir:

**Frontend:** HTML, CSS e JavaScript, com interfaces separadas para o administrador e o jogador.

**Backend:** servidor JavaScript responsável por processar as operações financeiras, validar decisões, executar sorteios e controlar os turnos.

**Banco de dados:** armazenamento central persistente para turmas, carteiras, operações e resultados.

**Sincronização:** mecanismo para atualizar as interfaces após ações do administrador ou mudanças financeiras.

O navegador não deverá ser considerado fonte confiável dos valores financeiros.

O servidor deverá validar as decisões e efetuar os cálculos que alterem o patrimônio.

O armazenamento local poderá ser utilizado apenas como complemento, nunca como fonte principal dos dados compartilhados.

## 44. Rotas de navegação

A aplicação poderá utilizar a seguinte organização:

| Rota | Finalidade |
|---|---|
| `/` | Listagem pública das turmas |
| `/turma/:id` | Listagem das carteiras da turma |
| `/carteira/:id` | Painel financeiro do aluno |
| `/admin` | Painel do administrador |

Não haverá necessidade de um sistema de contas para os estudantes.

Como o acesso às carteiras será livre, a aplicação deverá considerar que qualquer pessoa que consiga abrir uma carteira também poderá realizar ações nela.

Para o uso real com crianças, recomenda-se não expor nomes completos publicamente e evitar indexação por mecanismos de busca. Também é recomendável proteger as ações administrativas com uma chave ou código simples, sem necessidade de criar contas tradicionais.

## 45. Consistência e segurança dos dados

O servidor deverá impedir:

- Investimentos superiores ao saldo positivo.
- Operações voluntárias que criem dívidas.
- Resgate antecipado de renda fixa.
- Uso de oportunidades não habilitadas.
- Repetição de oportunidades já utilizadas.
- Sorteios duplicados.
- Crédito duplicado de CIM.
- Processamento duplicado de turnos.
- Alterações de decisões depois da liberação dos acontecimentos.
- Modificação direta de valores financeiros pelo navegador.

As alterações financeiras deverão ocorrer em transações consistentes.

Se ocorrer falha durante o processamento de um turno, o sistema deverá conseguir retomar ou repetir a operação sem duplicar seus efeitos.

---

# PARTE IX — CRITÉRIOS DE ACEITAÇÃO

## 46. Administração

A implementação estará correta quando permitir:

1. Criar várias turmas independentes.
2. Criar carteiras para cada turma.
3. Mostrar as carteiras pelo nome de exibição.
4. Ativar e desativar mecânicas individualmente por turma.
5. Executar diferentes quantidades de turnos por aula.
6. Encerrar as decisões dos alunos por comando administrativo.
7. Avançar para o próximo turno apenas por comando administrativo.
8. Mostrar um ranking de patrimônio por turma.
9. Preservar todos os dados depois de atualizar ou fechar o navegador.

## 47. Interface do estudante

A implementação estará correta quando:

1. A página inicial apresentar apenas turmas.
2. A seleção de turma mostrar suas carteiras.
3. O clique na carteira abrir diretamente o painel financeiro.
4. O painel mostrar apenas as informações e áreas definidas nesta especificação.
5. A reserva financeira for apresentada como recomendação, nunca como restrição.
6. As opções de decisão respeitarem as mecânicas habilitadas pelo administrador.
7. A interface atualizar os resultados quando o administrador liberar os acontecimentos.
8. Não existirem telas obrigatórias de fechamento de turno, aula ou jogo.
9. O aluno não precisar criar conta ou configurar sementes.

## 48. Motor financeiro

A implementação deverá ser testada para garantir que:

1. Os 36 turnos representem 18 anos.
2. A CIM seja creditada exatamente uma vez por turno.
3. A formação profissional seja calculada a partir do turno efetivo de escolha.
4. Promoções só tenham efeito no turno seguinte.
5. O desemprego dure um semestre.
6. Jogadores endividados não sofram novos desempregos.
7. Acontecimentos negativos sejam bloqueados durante dívidas.
8. Os rendimentos de mercado sejam iguais para carteiras da mesma turma.
9. Investimentos existentes continuem funcionando quando novas contratações forem desabilitadas.
10. Oportunidades sejam canceladas corretamente.
11. O principal e os juros das dívidas sejam registrados sem dupla contabilização.
12. O patrimônio do ranking seja calculado corretamente, inclusive com saldos negativos.
13. Nenhuma operação seja executada duas vezes por falhas de conexão ou cliques repetidos.
14. Os valores permaneçam consistentes após recarregamentos da página.

---

# CONSIDERAÇÕES FINAIS

Esta versão transforma o Jogo da Vida Financeira em uma aplicação educacional compartilhada e administrável.

A experiência dos alunos continuará centrada na tomada de decisões financeiras, mas o professor terá autonomia para controlar o ritmo e a progressão do conteúdo.

A reserva de emergência passa a representar uma escolha de planejamento, permitindo que o jogador experimente tanto os benefícios da liquidez quanto as consequências de investir sem proteção financeira.

O painel administrativo permitirá organizar turmas, cadastrar carteiras, disponibilizar mecânicas e acompanhar patrimônios.

A interface do jogador permanecerá concentrada em sua situação financeira, seus investimentos e suas oportunidades, sem telas ou informações adicionais que desviem a atenção das decisões.

**Esta especificação substitui a organização rígida por aulas e turnos das versões anteriores, preservando as regras financeiras e profissionais já estabelecidas.**
