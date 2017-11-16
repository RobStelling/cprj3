/***************************
Rotinas de desenho de mapas e gráficos
A fazer ("-" a fazer, "+" parcialmente feito, "x" finalizado):
+ Incluir resultado como histograma e tabela
  x Histograma - 15/12
  - Como tabs ?
x Converter mapa para TopoJSON: 05/01
x Converter para responsivo - 09/12 (Testar em todos browsers)
- Resolver legenda de mapa temático quando não há espaço para dígitos entre dois intervalos
x Revisar e reescrever a rotina de legenda dos mapas temáticos - 02/12
x Revisão e correção de DOM (index.html)- 19/11
x Desenhar mapas regionais e apagar diretamente por D3 - 19/11
x Resolver incompatibilidade de tooltip no Firefox - 20/11
  x código original dependia do global event, que não é suportado
  x pelo Firefox, substituido por d3.event
- Incluir tratamento de escala ordinal - distribuição
x Desenhar mapa mesmo quando não há dados de todos municípios - 08/12
x Melhorar tooltip - 20/11
  x Incluir caixa e fundo
  x Mudar padrão de cores (ajustar cores em função da coloração do mapa)
  x Incluir formatação no tooltip ("." por ",", "." de milhar, etc.) - 30/11
- Incluir chave no bind de dados
x Incluir transições - 19/11
x Tratar info adicional (informação adicional de mapa temático ou município ao
  clicar no botão) como html - 23/11
x Utilizar SVG/GeoJSon da Cogeo - 30/11
- Substituir botões por elementos de interface
  x Substituido por dropdown list - 24/11
- Preparar para celular
+ Reorganizar conteúdo, funções e variáveis globais - Parcialmente 19/11
  - Remover funções obsoletas
- Ajustes no SVG do mapa
  x Ler de arquivo - 30/11
  x Melhorar coloração de fronteiras - 01/12
  x Melhorar coloração de municípios
    x Adotar cores COGEO - 23/11
  x Corrigir tooltip aparecendo quando não há conteúdo - 19/11
  x Ler regiões das classes do mapa - 24/11
    x Revisar que informação deve estar codificada no mapa para que
      este possa ser utilizado para visualização
      x Nome município e bandeira - 25/11
      x Valor da variável - 18/11
    x Substituir nomes dos municípios normalizados por códigos ibge - 23/11
+ Mudar tratamento de globais
  + Encapsular em objetos/permitir inicialização
- Modificar rotinas para facilitar reutilização
  - Criar setters/getters
- Documentar
***************************/
!function() { 
  var cl = {};
  cl.nomeRegiao = ["Região Metropolitana", "Região Noroeste Fluminense", "Região Norte Fluminense", "Região Serrana", "Região das Baixadas Litorâneas", "Região do Médio Paraiba", "Região Centro-sul", "Região da Costa Verde"];
  cl.classeRegiao = ["metropolitana", "noroestefluminense", "nortefluminense", "serrana", "baixadaslitoraneas", "medioparaiba", "centro-sul", "costaverde"];
  cl.corRegioes = ["#b6defc", "#fcbbd6","#bdfcf9","#fce5b6", "#f2d4fc", "#b9b8fc", "#f2d4fc", "#b6fcb9"];
  cl.regiaoSelecao = 0;
  cl.semInfo = "#505050";
  cl.grayedout = "#808080";

  cl.status = "região";
  cl.regiaoAtual = 0;
  cl.leuJson = "não";
  cl.cor = {};

  var cl_svg = {},
    cl_escalaPrj = 1,
    cl_tamPxCap = 1.5,
    cl_tamStrokeDiv = 0.75,
    cl_projecao = {},
    cl_hashCoordenadas = {};
    cl_hashRegioes = {},
    cl_path = {},
    cl_hashDados = {},
    cl_margin = {top: 20, right: 100, bottom: 20, left: 70};


// Retorna nome ou id de um município por
// código municipal
  cl.nid = function (attr, cdmun) {
    var cdmun2id = {330010:function(a){return a=="nome"? "Angra dos Reis":a=="regiao"?7:"AngraDosReis";},
                    330015:function(a){return a=="regiao"?1:"Aperibé";},
                    330020:function(a){return a=="regiao"?4:"Araruama";},
                    330022:function(a){return a=="regiao"?6:"Areal";},
                    330023:function(a){return a=="nome"? "Armação dos Búzios":a=="regiao"?4:"ArmacaoDosBuzios";},
                    330025:function(a){return a=="nome"? "Arraial do Cabo":a=="regiao"?4:"ArraialDoCabo";},
                    330030:function(a){return a=="nome"? "Barra do Piraí":a=="regiao"?5:"BarraDoPirai";},
                    330040:function(a){return a=="nome"? "Barra Mansa":a=="regiao"?5:"BarraMansa";},
                    330045:function(a){return a=="nome"? "Belford Roxo":a=="regiao"?0:"BelfordRoxo";},
                    330050:function(a){return a=="nome"? "Bom Jardim":a=="regiao"?3:"BomJardim";},
                    330060:function(a){return a=="nome"? "Bom Jesus do Itabapoana":a=="regiao"?1:"BomJesusDoItabapoana";},
                    330070:function(a){return a=="nome"? "Cabo Frio":a=="regiao"?4:"CaboFrio";},
                    330080:function(a){return a=="nome"? "Cachoeiras de Macacu":a=="regiao"?0:"CachoeirasDeMacacu";},
                    330090:function(a){return a=="regiao"?1:"Cambuci";},
                    330093:function(a){return a=="regiao"?2:"Carapebus";},
                    330095:function(a){return a=="nome"? "Comendador Levy Gasparian":a=="regiao"?6:"ComendadorLevyGasparian";},
                    330100:function(a){return a=="nome"? "Campos dos Goytacazes":a=="regiao"?2:"CamposDosGoytacazes";},
                    330110:function(a){return a=="regiao"?3:"Cantagalo";},
                    330115:function(a){return a=="nome"? "Cardoso Moreira":a=="regiao"?2:"CardosoMoreira";},
                    330120:function(a){return a=="regiao"?3:"Carmo";},
                    330130:function(a){return a=="nome"? "Casimiro de Abreu":a=="regiao"?4:"CasimiroDeAbreu";},
                    330140:function(a){return a=="nome"? "Conceição de Macabu":a=="regiao"?2:"ConceicaoDeMacabu";},
                    330150:function(a){return a=="regiao"?3:"Cordeiro";},
                    330160:function(a){return a=="nome"? "Duas Barras":a=="regiao"?3:"DuasBarras";},
                    330170:function(a){return a=="nome"? "Duque de Caxias":a=="regiao"?0:"DuqueDeCaxias";},
                    330180:function(a){return a=="nome"? "Engenheiro Paulo de Frontin":a=="regiao"?6:"PauloDeFrontin";},
                    330185:function(a){return a=="regiao"?0:"Guapimirim";},
                    330187:function(a){return a=="nome"? "Iguaba Grande":a=="regiao"?4:"IguabaGrande";},
                    330190:function(a){return a=="nome"? "Itaboraí":a=="regiao"?0:"Itaborai";},
                    330200:function(a){return a=="regiao"?0:"Itaguaí";},
                    330205:function(a){return a=="regiao"?1:"Italva";},
                    330210:function(a){return a=="regiao"?1:"Itaocara";},
                    330220:function(a){return a=="regiao"?1:"Itaperuna";},
                    330225:function(a){return a=="regiao"?5:"Itatiaia";},
                    330227:function(a){return a=="regiao"?0:"Japeri";},
                    330230:function(a){return a=="nome"? "Laje do Muriaé":a=="regiao"?1:"LajeDoMuriae";},
                    330240:function(a){return a=="regiao"?2:"Macaé";},
                    330245:function(a){return a=="regiao"?3:"Macuco";},
                    330250:function(a){return a=="regiao"?0:"Magé";},
                    330260:function(a){return a=="regiao"?7:"Mangaratiba";},
                    330270:function(a){return a=="regiao"?0:"Maricá";},
                    330280:function(a){return a=="regiao"?6:"Mendes";},
                    330285:function(a){return a=="regiao"?0:"Mesquita";},
                    330290:function(a){return a=="nome"? "Miguel Pereira":a=="regiao"?6:"MiguelPereira";},
                    330300:function(a){return a=="regiao"?1:"Miracema";},
                    330310:function(a){return a=="regiao"?1:"Natividade";},
                    330320:function(a){return a=="regiao"?0:"Nilópolis";},
                    330330:function(a){return a=="regiao"?0:"Niterói";},
                    330340:function(a){return a=="nome"? "Nova Friburgo":a=="regiao"?3:"NovaFriburgo";},
                    330350:function(a){return a=="nome"? "Nova Iguaçú":a=="regiao"?0:"NovaIguacu";},
                    330360:function(a){return a=="regiao"?0:"Paracambi";},
                    330370:function(a){return a=="nome"? "Paraíba do Sul":a=="regiao"?6:"ParaibaDoSul";},
                    330380:function(a){return a=="regiao"?7:"Paraty";},
                    330385:function(a){return a=="nome"? "Paty do Alferes":a=="regiao"?6:"PatyDoAlferes";},
                    330390:function(a){return a=="regiao"?3:"Petrópolis";},
                    330395:function(a){return a=="regiao"?5:"Pinheiral";},
                    330400:function(a){return a=="nome"? "Piraí":a=="regiao"?5:"Pirai";},
                    330410:function(a){return a=="regiao"?1:"Porciúncula";},
                    330411:function(a){return a=="nome"? "Porto Real":a=="regiao"?5:"PortoReal";},
                    330412:function(a){return a=="regiao"?5:"Quatis";},
                    330414:function(a){return a=="regiao"?0:"Queimados";},
                    330415:function(a){return a=="regiao"?2:"Quissamã";},
                    330420:function(a){return a=="regiao"?5:"Resende";},
                    330430:function(a){return a=="nome"? "Rio Bonito":a=="regiao"?0:"RioBonito";},
                    330440:function(a){return a=="nome"? "Rio Claro":a=="regiao"?5:"RioClaro";},
                    330450:function(a){return a=="nome"? "Rio das Flores":a=="regiao"?5:"RioDasFlores";},
                    330452:function(a){return a=="nome"? "Rio das Ostras":a=="regiao"?4:"RioDasOstras";},
                    330455:function(a){return a=="nome"? "Rio de Janeiro":a=="regiao"?0:"RioDeJaneiro";},
                    330460:function(a){return a=="nome"? "Santa Maria Madalena":a=="regiao"?3:"SantaMariaMadalena";},
                    330470:function(a){return a=="nome"? "Santo Antônio de Pádua":a=="regiao"?1:"SantoAntonioDePadua";},
                    330475:function(a){return a=="nome"? "São Francisco de Itabapoana":a=="regiao"?2:"SaoFranciscoDeItabapoana";},
                    330480:function(a){return a=="nome"? "São Fidélis":a=="regiao"?2:"SaoFidelis";},
                    330490:function(a){return a=="nome"? "São Gonçalo":a=="regiao"?0:"SaoGoncalo";},
                    330500:function(a){return a=="nome"? "São João da Barra":a=="regiao"?2:"SaoJoaoDaBarra";},
                    330510:function(a){return a=="nome"? "São João de Meriti":a=="regiao"?0:"SaoJoaoDeMeriti";},
                    330513:function(a){return a=="nome"? "São José de Ubá":a=="regiao"?1:"SaoJoseDeUba";},
                    330515:function(a){return a=="nome"? "São José do Vale do Rio Preto":a=="regiao"?3:"SaoJoseDoValeDoRioPreto";},
                    330520:function(a){return a=="nome"? "São Pedro da Aldeia":a=="regiao"?4:"SaoPedroDaAldeia";},
                    330530:function(a){return a=="nome"? "São Sebastião do Alto":a=="regiao"?3:"SaoSebastiaoDoAlto";},
                    330540:function(a){return a=="regiao"?6:"Sapucaia";},
                    330550:function(a){return a=="regiao"?4:"Saquarema";},
                    330555:function(a){return a=="regiao"?0:"Seropédica";},
                    330560:function(a){return a=="nome"? "Silva Jardim":a=="regiao"?4:"SilvaJardim";},
                    330570:function(a){return a=="regiao"?3:"Sumidouro";},
                    330575:function(a){return a=="regiao"?0:"Tanguá";},
                    330580:function(a){return a=="regiao"?3:"Teresópolis";},
                    330590:function(a){return a=="nome"? "Trajano de Moraes":a=="regiao"?3:"TrajanoDeMoraes";},
                    330600:function(a){return a=="nome"? "Três Rios":a=="regiao"?6:"TresRios";},
                    330610:function(a){return a=="regiao"?5:"Valença";},
                    330615:function(a){return a=="regiao"?1:"Varre-Sai";},
                    330620:function(a){return a=="regiao"?6:"Vassouras";},
                    330630:function(a){return a=="nome"? "Volta Redonda":a=="regiao"?5:"VoltaRedonda";} };
      try {
        return cdmun2id[cdmun](attr);
      }
      catch (err) {
        return undefined;
      }
    };
// Deve virar config ?
  cl.titulo = function(leg){
    // Apaga titulo anterior, se houver
    cl_svg.select("g.titulo")
    /*    .transition()
      .duration(750)
      .delay(100)
      .ease("cubic-in-out")
      .attr("transform","translate(50,0)")
      .attr("opacity", "0.7") */
      .remove();
    // Inclui novo titulo
    cl_svg.append("g")
      .attr({class: "titulo", transform: "translate(10,50)"})
      .append("text").attr({class: "caption", y: 50}).text(leg);
  };

  cl.leJson = function(mapaJson, capitais){
    var  w = 950 - cl_margin.left - cl_margin.right,
        h = 600 - cl_margin.top - cl_margin.bottom, mapaFeatures,
        brasil = d3.locale({
          decimal: ",",
          thousands: ".",
          grouping: [3],
          currency: ["R$", ""],
          dateTime: "%a %b %e %X %Y",
          date: "%d/%m/%Y",
          time: "%H:%M:%S",
          periods: ["AM", "PM"],
          days: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
          shortDays: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
          months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
          shortMonths: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
        });

    if (3.14.toLocaleString().indexOf(",") == 1)
      d3.format = brasil.numberFormat;

    cl_projecao = d3.geo.conicEqualArea().center([0,-22.05]).rotate([42.37, 0]).parallels([-21.05,-23.05]).scale(12500);

    //d3.geo.mercator().scale(10500).translate([8250, -3900]);
    cl_path = d3.geo.path().projection(cl_projecao);
    cl_svg = d3.select("div.mapa")
      .append("svg")
      .attr("class", "mapcanvas")
      .attr("viewBox", "0 0 "+(w+cl_margin.left+cl_margin.right)+" "+(h+cl_margin.top+cl_margin.bottom))
      .style({stroke: "#666666", "stroke-dasharray": "2,2", "stroke-linejoin": "round"})
      .append("g")
      .attr("class", "mvG")
      //.attr("transform", "translate(0,0)");
      .attr("transform", "translate(" + (cl_margin.left + cl_margin.right) + "," + (cl_margin.top + cl_margin.bottom) + ")");

    cl.leuJson = "não";

    d3.json(mapaJson, function(error, mapa) {
      if (error) return console.error(error);
      criaTooltip();
      cl.leuJson = "sim";
      mapaFeatures = topojson.feature(mapa, mapa.objects.BaseRJ);
      // Cria paths      
      cl_svg.selectAll(".regiao")
        .data(mapaFeatures.features)
        .enter()
      //      .append("g").attr("class", function(d) { return "M"+d.properties.cdmun; })
        .append("path")
        .attr("class", function(d) { return "municipio " + cl.classeRegiao[d.properties.cdrgigov-1]})
        .attr("id", function(d) { return cl.nid("id", d.properties.cdmun)})
        .attr("d", cl_path)
        .style("stroke-width", (cl_tamStrokeDiv / cl_escalaPrj) + "px")
        .text(function(d){ return cl.nid("nome", d.properties.cdmun)});
      cl_hashRegioes = {};
      for (i = 0; i < (mapaFeatures.features).length; i++) {
        cl_hashRegioes[mapaFeatures.features[i].properties.cdmun] = mapaFeatures.features[i].properties.cdrgigov;
      }
      hookTooltip();
      cl.todasRegioes();
      // Lê informações de sedes municipais
      d3.csv(capitais, function(c){
        return {
          cdmun: +c.CODIBGE,
          lat: +c.Latitude,
          lon: +c.Longitude
        };}, function(error, c){
        if (error)
          return console.error(error);
        // Plota pontos das sedes municipais no mapa
        cl_svg.selectAll("circle")
          .data(c)
          .enter()
          .append("circle")
          .attr("cx", function(d) {return cl_projecao([d.lon, d.lat])[0];})
          .attr("cy", function(d) {return cl_projecao([d.lon, d.lat])[1];})
          .attr("r", cl_tamPxCap/cl_escalaPrj + "px" )
          .attr("id", function(d) {return "C"+d.cdmun })
          .attr("class", function(d) {return cl.classeRegiao[cl_hashRegioes[d.cdmun]-1]; });
        // Preenche o hash de coordenadas no formato longitude/latitude
        cl_hashCoordenadas = {};
        for (i = 0; i < c.length; i++) {
          cl_hashCoordenadas[c[i].cdmun] = [c[i].lon, c[i].lat];
        }
        // d3.select(".mvG").call(zoom);
        function zoom() {
          var c;
          cl_escalaPrj = d3.event.scale;
          cl_svg.attr("transform", "translate(" + [d3.event.translate[0]+cl_margin.left+cl_margin.right, d3.event.translate[1]+cl_margin.top+cl_margin.bottom] + ")scale(" + d3.event.scale + ")");
          //cl_svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
          cl_svg.selectAll(".municipio").style("stroke-width", (cl_tamStrokeDiv / cl_escalaPrj) + "px");
          c = "circle";
          if (cl.regiaoAtual != 0)
            c = c+"."+cl.classeRegiao[cl.regiaoAtual-1];
          cl_svg.selectAll(c).attr("r", (cl_tamPxCap / cl_escalaPrj) + "px");
          
        }
        d3.select(".mvG").call(d3.behavior.zoom().scaleExtent([1,8]).size( [950, 600]).on("zoom", zoom)).on("dblclick.zoom", null);
      });
    });
  };

/*
 * Depuração e geração de vetores internos
 
  var cl_codMunOrd = [330010, 330015, 330020, 330022,
                  330023, 330025, 330030, 330040,
                  330045, 330050, 330060, 330070,
                  330080, 330090, 330093, 330095,
                  330100, 330110, 330115, 330120,
                  330130, 330140, 330150, 330160,
                  330170, 330180, 330185, 330187,
                  330190, 330200, 330205, 330210,
                  330220, 330225, 330227, 330230,
                  330240, 330245, 330250, 330260,
                  330270, 330280, 330285, 330290,
                  330300, 330310, 330320, 330330,
                  330340, 330350, 330360, 330370,
                  330380, 330385, 330390, 330395,
                  330400, 330410, 330411, 330412,
                  330414, 330415, 330420, 330430,
                  330440, 330450, 330452, 330455,
                  330460, 330470, 330475, 330480,
                  330490, 330500, 330510, 330513,
                  330515, 330520, 330530, 330540,
                  330550, 330555, 330560, 330570,
                  330575, 330580, 330590, 330600,
                  330610, 330615, 330620, 330630];

 // Função auxiliar na criação do vetor, desnecessária em produção
  function cl_gvetor(dados, prefixo)
  {
    var varList = prefixo;
    for (i = 0; i<dados.length; i++)
      varList = varList + "["+cl_codMunOrd[i]+","+dados[i]+"],";
    console.log(varList);

  }
 */

/*
  var zoom = d3.behavior.zoom()
    .translate([0, 0])
    .scale(1)
    .scaleExtent([1, 16])
    .on("zoom", zoomed);
      function zoomed() {
        tr = d3.event.translate;
        tr[0] = tr[0]+cl_margin.right+cl_margin.left;
        tr[1] = tr[1]+cl_margin.top+cl_margin.bottom;
        cl_svg.attr("transform", "translate(" + tr + ")scale(" + d3.event.scale + ")");
        cl_svg.selectAll(".municipio").style("stroke-width", cl_tamStrokeDiv / cl_escalaPrj + "px");
        cl_svg.selectAll("circle").style("r", cl_tamPxCap / d3.event.scale + "px");
      }
*/


  cl.apagaLegenda = function(){
    var legenda;
    legenda = d3.select("g.legenda");

    if (legenda[0][0] == null)
      return false;
    legenda.selectAll("rect").on("mouseover", null).on("mouseout", null);
    legenda.remove();
    return true;
  };
/*
 * cl.pintaMapa:
 * dados: Vetor de tuplas [município, valor]
 * ditribuicao: 'sqrt', 'linear'
 * rangeMap: mapa de cores que serão usadas para colorir o mapa
 * tit: Título do mapa
 * faixas: Número de classes que serão utilizadas
 */
  cl.pintaMapa = function (dados, distribuicao, rangeMap, tit, faixas){
    var i;
    var min, max;
    var domEixo = [], rangEixo = [];

    cl.apagaLegenda();
    cl.regiaoSelecao = 0;
    //d3.select("g.legenda").remove();

    cl.status = "mapa";

    if (cl.regiaoAtual != 0) {
      recolheCapitais(cl.regiaoAtual);
      cl.regiaoAtual = 0;
    }

    cl_hashDados = {};

    // Encontra o índice do primeiro dado válido
    for (i = 0; i < dados.length; i++) {
      if (cl.nid("nome", dados[i][0]) !== undefined)
        break;
    }

    for (max = min = dados[i][1]; i < dados.length; i++) {
      if (cl.nid("nome", dados[i][0]) !== undefined) {  // Se é válido computa max, min e hashdados
        cl_hashDados[dados[i][0]] = dados[i][1];
        if (min > dados[i][1])
          min = dados[i][1];
        else if (max < dados[i][1])
          max = dados[i][1];
      }
    }
    cl.titulo(tit);
    var domainMap = [min, max];
    switch(distribuicao) {
      case 'sqrt':
        // cor é a cor selecionada em rangeMap de um valor no domínio domainMap
        cl.cor = d3.scale.sqrt().domain(domainMap).range(rangeMap);
        min = min-(Math.abs(min)/1000);
        max = max+(Math.abs(min)/1000);
    
        var rg = max-min;
        var fx = rg/(Math.pow(2,faixas)-1);
        var k = 0;
        for (i = 0; i <= faixas; i++) {
          domEixo = domEixo.concat([min+k*fx]);
          rangEixo = rangEixo.concat([cl.cor(domEixo[i])]);
          k = k + Math.pow(2, i);
        }
        var y = d3.scale.sqrt().domain([min,max]).range([0,550]);
        break;
      default:
        cl.cor = d3.scale.linear().domain(domainMap).range(rangeMap);
        min = min-(Math.abs(min)/1000);
        max = max+(Math.abs(min==0?1e-3:min)/1000);
        var k = max-min;
        var fx = k/faixas;
        for (i = 0; i<=faixas; i++) {
          domEixo = domEixo.concat([min+i*fx]);
          rangEixo = rangEixo.concat([cl.cor(domEixo[i])]);
        }
        var y = d3.scale.linear().domain([min,max]).range([0,550]);
    }
    cl.cor = d3.scale.threshold().domain(domEixo).range(rangEixo);
    var yAxis = d3.svg.axis().scale(y).tickValues(cl.cor.domain()).orient("left");
    var g = cl_svg.append("g")
    .attr("class", "legenda")
    .attr("transform", "translate(-80, 0)")
    .call(yAxis);

    g.selectAll("rect") // Monta legenda
      .data(cl.cor.range().map(function(d, i) {
      return {
        y0: i ? y(cl.cor.domain()[i - 1]) : y.range()[0],
        y1: i < cl.cor.domain().length ? y(cl.cor.domain()[i]) : y.range()[1],
        z: d
      };
    }))
      .enter().append("rect")
      .attr("width", 15)
      .attr("y", function(d) { return d.y0; })
      .attr("height", function(d) { return d.y1 - d.y0; })
      .style("fill", function(d) { return d.z; });

    g.selectAll("rect")
      .on("mouseover", function(d) {
      var mun = d3.selectAll("path.municipio");
      d3.selectAll("rect").style("fill", function(r) {
        if (r.z == d.z)
          return cl.grayedout;
        else
          return "false";});
      mun.style("fill", function(m){
        if (cl.regiaoSelecao) {
          if (m.properties.cdrgigov == cl.regiaoSelecao)
            if (d.z == cl.cor(cl_hashDados[m.properties.cdmun]))
              return cl.grayedout;
          return "false";
        }
        if (d.z == cl.cor(cl_hashDados[m.properties.cdmun]))
          return cl.grayedout;
        else
          return "false";
      });
    })
      .on("mouseout", function(d) {
      var mun = d3.selectAll("path.municipio");
      d3.selectAll("rect").style("fill", function(r) {
        if (r.z == d.z)
          return r.z;
        else
          return "false";});
      mun.style("fill", function(m){
        if (cl.regiaoSelecao) {
          if (m.properties.cdrgigov == cl.regiaoSelecao)
            if (d.z == cl.cor(cl_hashDados[m.properties.cdmun]))
              return d.z;
          return "false";
        }
        if (cl.cor(cl_hashDados[m.properties.cdmun]) == d.z)
          return d.z;
        else
          return "false";
      });    
    });

    d3.selectAll("path.municipio") // Pinta municípios
      .transition()
      .duration(1000)
      .delay(100)
      .ease("cubic-in-out")
      .style("fill", function(d) {return cl.cor(cl_hashDados[d.properties.cdmun])})
      .text(function(d) {
      if (typeof (cl_hashDados[d.properties.cdmun]) === 'undefined')
        return(cl.nid("nome", d.properties.cdmun));
      else 
        return(cl.nid("nome", d.properties.cdmun)
               + ": " + cl_hashDados[d.properties.cdmun].toLocaleString())});

    //  cl_hashDados = {};
  };

  function recolheCapitais(regiao)
  {
    // Recolhe as capitais de todas as regiões menos a atual
    d3.selectAll("circle").filter(function (d,i) { return cl_hashRegioes[d.cdmun]!=regiao;})
    //  d3.selectAll("circle."+cl.classeRegiao[regiao-1])
      .transition()
      .duration(500)
      .ease("cubic-in-out")
      .attr("r", cl_tamPxCap/cl_escalaPrj + "px")
      .attr("cx", function(dd) { return cl_projecao(cl_hashCoordenadas[dd.cdmun])[0];})
      .attr("cy", function(dd) { return cl_projecao(cl_hashCoordenadas[dd.cdmun])[1];})
    d3.select("svg").select("g.mvG").select("g.infoMun").remove();

  }
  function enviaCapitais(regiao, titulo)
  {
    // Distribui os pontos menos o da região atual
    d3.selectAll("circle").filter(function (d,i) { return cl_hashRegioes[d.cdmun]!=regiao;})
    //  d3.selectAll("circle."+cl.classeRegiao[regiao-1])
      .transition()
      .duration(500)
      .ease("cubic-in-out")
      .attr({r:"7", cx: "20", cy: "20"});
    //Escreve o título
    d3.select("svg").select("g.mvG").append("g")
      .attr({class: "infoMun", transform: "translate(35,5)"})
      .append("text")
      .attr({class: "titulo1", y:"24"})
      .transition()
      .delay(500)
      .text(titulo?titulo:cl.nomeRegiao[regiao-1]);
  }
// Pinta uma Região
  cl.selecionaRegiao = function(regiao){
    //cl.status = "região";
    cl.regiaoSelecao = regiao;
    // cl.apagaLegenda();
    //  d3.select("g.legenda").remove();
    // cl_hashDados = {};
    cl_svg.selectAll(".municipio")
      .transition()
      .duration(1000)
      .delay(100)
      .ease("cubic-in-out")
      .style("fill", function(d) {
      if (d.properties.cdrgigov == regiao)
        if (cl.status == "mapa")
          return cl.cor(cl_hashDados[d.properties.cdmun]);
        else
          return cl.corRegioes[regiao-1];
      else
        return cl.semInfo;
    });

    d3.selectAll(".bar")
      .transition()
      .duration(1000)
      .delay(100)
      .ease("cubic-in-out")
      .style("fill", function(d){
        if (cl.nid("regiao", +d[0]) == regiao-1)
          if (cl.status == "mapa")
            return cl.cor(d[1]);
          else
            return cl.corRegioes[regiao-1];
        else
          return cl.semInfo;
      });
    if (cl.regiaoAtual != regiao) { // Se mudou de região
      if (cl.regiaoAtual != 0) { // Recolhe os pontos da região anterior
        recolheCapitais(cl.regiaoAtual);
      }
      enviaCapitais(regiao);
      cl.regiaoAtual = regiao;
    }    
  };
//Pinta todas Regiões
  cl.todasRegioes = function(){
    cl.status = "região";
    cl.regiaoSelecao = 0;
    cl.apagaLegenda();
    //  d3.select("g.legenda").remove();
    cl_hashDados = {};
    if (cl.regiaoAtual != 0) {
      recolheCapitais(cl.regiaoAtual);
      cl.regiaoAtual = 0;
    }
    cl_svg.selectAll("path")
      .transition()
      .duration(1000)
      .delay(100)
      .ease("cubic-in-out")
      .style("fill", function(d) {
      return cl_hashDados[d.properties.cdmun] = cl.corRegioes[d.properties.cdrgigov-1]
    });
    d3.selectAll(".bar")
      .transition()
      .duration(1000)
      .delay(100)
      .ease("cubic-in-out")
      .style("fill", function(d){
      return cl.corRegioes[cl.nid("regiao", +d[0])];
    });
  };
// Cria o maptip, formato html (pode ser interessante incluir a bandeira do município ou outros
// elementos gráficos de pequeno impacto visual no tooltip)
  function criaTooltip()
  {
    cl.tooltip = d3.select("body")
      .append("div")

    //   .style("vertical-align", "middle")
      .classed("myTip", true)
      .html("Rio de Janeiro");
  }
// Cria os hooks para o maptip

  function hookTooltip()
  {
    var svg = d3.selectAll("path.municipio")
    .on("mouseover", function(d){
      var tip = d3.select("div.myTip");
      if (cl.status == "mapa")
        if ( typeof(cl_hashDados[d.properties.cdmun]) !== 'undefined' ) {
          tip.html(cl.nid("nome", d.properties.cdmun)+": "      
                   +cl_hashDados[d.properties.cdmun].toLocaleString());
          d3.select(".legenda").selectAll("rect").style("fill", function(f) {
            if (cl.cor(cl_hashDados[d.properties.cdmun]) == f.z)
              return "grey";
            else
              return false;
          });
        } else
          tip.html(cl.nid("nome", d.properties.cdmun));
      else
        tip.html( /* cl.nomeRegiao[d.properties.cdrgigov -1]+
                 ": "+ */ cl.nid("nome", d.properties.cdmun)+
          " <img src=./bandeiras/"+d.properties.cdmun+".jpg height='29' width='47'></img>");

      d3.select("svg #"+cl.nid("id", d.properties.cdmun))
        .style("fill", cl.grayedout);

      if (cl.regiaoAtual != d.properties.cdrgigov) { // Se mudou de região
        if (cl.regiaoAtual != 0) { // Recolhe os pontos da região anterior
          recolheCapitais(cl.regiaoAtual);
        }
        enviaCapitais(cl_hashRegioes[d.properties.cdmun]);

        cl.regiaoAtual = d.properties.cdrgigov;
      }
      /*
      if (cl.status == "região")
        selecionaRegiao(d.properties.cdrgigov);
      */

      return cl.tooltip.style("visibility", "visible");})

    .on("mousemove", function(){
      return cl.tooltip.style("top", (d3.event.pageY-10)+"px")
        .style("left",(d3.event.pageX+15)+"px");})

    .on("mouseout", function(d){
      d3.select("svg #"+cl.nid("id", d.properties.cdmun))
        .style("fill", function(d) {
          if (cl.status == "mapa") {
            if (cl.regiaoSelecao == 0 || cl.regiaoSelecao-1 == cl.nid("regiao", d.properties.cdmun))
              return cl.cor(cl_hashDados[d.properties.cdmun]);
            return cl.semInfo;
          }
          if (cl.regiaoSelecao) {
            if (cl.nid("regiao", d.properties.cdmun) == cl.regiaoSelecao-1)
              return cl.corRegioes[cl.regiaoSelecao-1];
            return cl.semInfo;
          }
          return cl.corRegioes[cl.nid("regiao", d.properties.cdmun)];
        });
      if (cl.status == "mapa" && typeof (cl_hashDados[d.properties.cdmun]) !== 'undefined' ) {
        d3.select(".legenda").selectAll("rect").style("fill", function(f) {
          var corMun;
          if ((corMun=cl.cor(cl_hashDados[d.properties.cdmun])) == f.z)
            return corMun;
          else
            return false;
        });
      }
      return cl.tooltip.style("visibility", "hidden");});
  }
  if (typeof define === "function" && define.amd) this.cl = cl, define(cl); else if (typeof module === "object" && module.exports) module.exports = cl; else this.cl = cl;
}();