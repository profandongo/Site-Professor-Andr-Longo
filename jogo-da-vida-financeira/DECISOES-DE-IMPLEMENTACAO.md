# Decisões de implementação — especificação 2.1

A especificação anexada é a referência principal. A organização rígida em seis aulas, o armazenamento exclusivamente local e os relatórios no painel do aluno não são utilizados. As seis etapas aparecem como referência pedagógica no painel administrativo.

Ambiguidades identificadas antes da interface:
- Bônus para pessoas inelegíveis: substituído por Nenhum acontecimento, sem novo sorteio.
- Sorteios de renda variável: distribuição uniforme contínua no intervalo especificado; acontecimentos monetários usam os incrementos de R$ 10 exigidos.
- Carteiras tardias: continuam atrasadas e não participam dos fechamentos; nenhuma compensação automática ou regularização inventada.
- Troca de profissão: não disponibilizada depois da primeira escolha; uma nova formação e seus efeitos não foram definidos.
- Estado inicial de mecânicas: todas as opcionais começam desabilitadas e são liberadas individualmente pelo professor.
- Custos mensais de cursos e especialização: nenhum pagamento inicial adicional, pois o documento só define desconto na CIM semestral.
- Benefícios e arredondamento: cada aumento percentual é arredondado para cima em centavos, seguido da soma dos aumentos fixos.

## Arquitetura
HTML renderizado por React/Vinext, CSS e motor financeiro em JavaScript puro. Banco D1 compartilhado. Cada turma é um agregado JSON versionado: todas as carteiras, sorteios, decisões e resultados são persistidos juntos por uma única atualização condicional (compare-and-swap). Em conflito, nenhuma escrita parcial é aplicada. Nenhum cálculo patrimonial enviado pelo cliente é aceito.

O administrador cria uma chave no primeiro acesso privado a /admin. A chave é guardada com sal aleatório e SHA-256; nunca é enviada no HTML ou no relatório. Acesso privado da hospedagem é uma camada adicional. Tornar o site público exigirá uma decisão explícita de compartilhamento; as carteiras são abertas, conforme a especificação, e qualquer visitante autorizado poderá tomar decisões em qualquer carteira.

Rascunhos locais são complemento. Decisões só contam quando registradas no servidor. Atualização periódica a cada cinco segundos. LocalStorage não guarda a chave administrativa.

## Verificação
`npm test`: testes de 36 turnos, idempotência, arredondamento, rendimentos compostos, maturidade, mercado compartilhado, formação relativa à escolha, promoções futuras, desemprego, seguro, bloqueios, oportunidades e renegociação.

## Publicação
Esta versão usa Sites com D1. Não altera nem conecta automaticamente o repositório GitHub anterior ao Netlify. Uma migração para Netlify precisa de backend e banco equivalentes; apenas copiar o frontend não mantém as regras compartilhadas.
