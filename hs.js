/*
 * Rotinas de histograma para saída do Ceperj DADOS
 * Global: hs
 * Todo:
 * x Converter rotinas para getter/setter: 19/12
 * - Remover dependência de cores do mapa ?
 * - Trabalhar sobre uma seleção
 * - Ajustar locale dos valores do eixo y e legenda (ver em coloring.js)
 * x Melhorar tooltip para a legenda do histograma: 18/12
 * x Ajustar a transição entre gráficos: 05/01
 * - Incluir linhas de média (estado, regiões, seleção, entrada (média do país ou mundial, por exemplo)
 * - Pensar como incluir small multiples (tanto no histograma quanto no cloropleth)
 * x Incluir imagem alternativa antes da criação do primeiro histograma (em index.html): 05/01 (texto)
 */
!function() { 
  var hs = {
    version: "1.0.5"
  };

  hs.histograma = function () {
    var dados = [];
    var legenda = "Histograma";
    var escalaY = "linear";
    var margin = {top: 20, right: 10, bottom: 160, left: 70},
      width = 950 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom,
      hsdata = [];

    svgH = d3.select("body").select("div.hist")
      .append("svg")
        .attr("viewBox", "0 0 "+(width+margin.left+margin.right)+
          " "+(height+margin.top+margin.bottom))
        //.attr("width", width + margin.left + margin.right)
        //.attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    hstext = svgH
      .append("text")
        .attr({class: "titulo1", x: "0", dx: ".35em", y: String((height+margin.top+margin.bottom)/2)})
        .text("Selecione um indicador");
    hsinicio = true;

    hsx = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1, 1);
    
    hsxAxis = d3.svg.axis()
        .scale(hsx)
        .orient("bottom");

    function hs_labelToolTip() {
      var svg =  d3.select(".y.axis");
      svg.on("mouseover", function() {
        var tip = d3.select("div.myTip");
        tip.html(hs.legenda);
        return cl.tooltip.style("visibility", "visible");})
      .on("mousemove", function() {
        return cl.tooltip.style("top", (d3.event.pageY-10)+"px")
        .style("left",(d3.event.pageX+15)+"px");})
      .on("mouseout",  function() {
        return cl.tooltip.style("visibility", "hidden");}); 
    };

    function hs_hookToolTip(){
      var svg = svgH.selectAll(".bar")
        .on("mouseover", function(d){
          var tip = d3.select("div.myTip");
          tip.html(cl.nid("nome", d[0])+": "+d[1].toLocaleString()+
            " <img src=./bandeiras/"+d[0]+".jpg height='29' width='47'></img>");
          d3.select("svg #H"+d[0])
              .style("fill","gray");
          return cl.tooltip.style("visibility", "visible");
        })
        .on("mousemove", function(){
          return cl.tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+15)+"px");
        })
        .on("mouseout", function(d){
          d3.select("svg #H"+d[0])
              .style("fill", function(d) {
            if (cl.status == "mapa") {
              if (cl.regiaoSelecao == 0 || cl.regiaoSelecao-1 == cl.nid("regiao", d[0]))
               return cl.cor(d[1]);
              else
                return cl.semInfo;
            }
            if (cl.regiaoSelecao) {
              if (cl.nid("regiao", d[0]) == cl.regiaoSelecao-1)
                return cl.corRegioes[cl.regiaoSelecao-1];
              return cl.semInfo;
            }
            return cl.corRegioes[cl.nid("regiao", d[0])];
          });
          return cl.tooltip.style("visibility", "hidden");
        });
    };

    function hs_stringLimpa(s) {
      return s.toUpperCase().replace(/ /g,"").replace(/[ÃÂÁÀÄ]/g, "A").replace(/[ÊÉÈË]/g, "E").replace(/[ÎÍÌÏ]/g, "I").replace(/[ÕÔÓÒÖ]/g, "O").replace(/[ÛÚÙÜ]/g, "U");
    };

    function hs_ordena() {
    // Copia na escrita já que tweens são avaliados depois de um delay.
      var x0 = hsx.domain(hsdata.sort(this.checked ?
                                        function(a, b) { return b[1] - a[1]; } :
                                        function(a, b) { return d3.ascending(hs_stringLimpa(cl.nid("nome", a[0])),
                                      hs_stringLimpa(cl.nid("nome", b[0]))); })
                                     .map(function(d) { return cl.nid("nome", d[0]); })).copy();

      svgH.selectAll(".bar")
        .sort(function(a, b) { return x0(cl.nid("nome",a[0])) - x0(cl.nid("nome", b[0])); });

      var transition = svgH.transition().duration(950),
          delay = function(d, i) { return i * 30; };

      transition.selectAll(".bar")
          .delay(delay)
          .attr("x", function(d) { return x0(cl.nid("nome", d[0])); });
      transition.select(".x.axis")
          .call(hsxAxis)
          .selectAll("g")
          .delay(delay)
          .selectAll("text")
          .attr("y", 0)
          .attr("x", -10)
          .attr("dy", ".35em")
          .attr("transform", "rotate(-90)")
          .style("text-anchor", "end");
    };

/*
 * Elimina dados de entrada que não tenham código correto de município 
 * do Rio de Janeiro e retorna um vetor ordenado pela variável passada
 */
    function hs_valida(dados) {
      var i, j, k = [];
      for (i = 0, j = 0; i < dados.length; i++) {
        if (cl.nid("regiao", dados[i][0]) !== undefined)
          k[j++] = dados[i];
      }
      /*
      k1 = k.sort(function(a,b) { return b[1] - a[1];});
      */

      k1 = k.sort(function(a,b) {
        return  d3.ascending(hs_stringLimpa(cl.nid("nome", a[0])),
                             hs_stringLimpa(cl.nid("nome", b[0])));});
      return k1;
    };

    function histograma() {
      var y, yAxis, atual;

      d3.select("input#hist").property("checked", false);
      dados = hs_valida(dados);
        // hsdata = hs_valida(dados);

      if (escalaY == "linear")
        y = d3.scale.linear().range([height, 0]);
      else
        y = d3.scale.sqrt().range([height, 0]);
      yAxis = d3.svg.axis().scale(y).orient("left");

      /*
        hsx.domain(hsdata.map(function(d, i) { return cl.nid("nome", d[0]); }));
        y.domain([Math.min(0, d3.min(hsdata, function(d, i) { return d[1]; })),
                 d3.max(hsdata, function(d, i) { return d[1]; })]);
      */
      if (!hsinicio) {
        var dur1 = 1000, dur2 = 500, dur3 = 2500;
      // Recolhe barras do gráfico anterior e atenua cor
        svgH.selectAll(".bar")
            .transition()
            .ease("sin-in-out")
            .duration(dur1)
            .attr("y", height)
            .attr("height", "0")
            .style("fill", cl.grayedout);
        // Deixa eixos transparentes - preciso rever
        svgH.selectAll("g.axis")
            .transition()
            .ease("sin-in-out")
            .duration(dur2)
            .attr({opacity:"0"});

        if ((dataMin = Math.min(0, d3.min(dados, function(d,i){return d[1];}))) < 0)
          if (escalaY == "linear")
            dataMin = dataMin * 1.05;
          else
            dataMin = dataMin * 1.3;

        y.domain([dataMin ,d3.max(dados,function(d,i){return d[1];})]);
        d3.select(".y.axis").call(yAxis).style("opacity", 1.0);
        d3.select(".y.axis").select("text.gLabel").text(hs.legenda=legenda);
        hs_labelToolTip();
        hsx.domain(dados.map(function(d, i) { return cl.nid("nome", d[0]); }));
        d3.select(".x.axis")
          .call(hsxAxis)
            .style("opacity", 1.0)
            .selectAll("text")
            .attr("y", 0)
            .attr("x", -10)
            .attr("dy", ".35em")
            .attr("transform", "rotate(-90)")
            .style("text-anchor", "end");

        atual = svgH.selectAll(".bar").data(dados, function(d){return d[0];});
        atual.transition()
            .duration(dur1+dur2)
            .ease("cubic")
            .attr("class", "bar")
            .attr("width", hsx.rangeBand())
            //        .attr("y", height)
            .attr("height", "0")
            .attr("id", function(d) { return "H"+d[0];})
            .style("fill", function(d, i) {return cl.cor(d[1])})
            .attr("y", function(d) { return y(d[1]); })
            .attr("x", function(d) { return hsx(cl.nid("nome", d[0])); })
            .attr("height", function(d) { return height - y(d[1]); });

        atual.enter().append("rect")
            .attr("class", "bar")
            .attr("width", hsx.rangeBand())
            .attr("y", height)
            .attr("height", "0")
            .attr("id", function(d) { return "H"+d[0];})
            .style("fill", function(d, i) {return cl.cor(d[1])});

        atual.transition()
            .duration(1500)
            .ease("cubic")
            .style("fill", function(d, i) {return cl.cor(d[1])})
            .attr("width", hsx.rangeBand())
            .attr("y", function(d) { return y(d[1]); })
            .attr("x", function(d) { return hsx(cl.nid("nome", d[0])); })
            .attr("height", function(d) { return height - y(d[1]); });

        setTimeout(function(){atual.exit().remove();}, dur3);

        hsdata = dados;
        hs_hookToolTip();
      } else {
        hsdata = hs_valida(dados);
        hsx.domain(hsdata.map(function(d, i) { return cl.nid("nome", d[0]); }));

        if ((dataMin = Math.min(0, d3.min(hsdata, function(d,i){return d[1];}))) < 0)
          if (escalaY == "linear")
            dataMin = dataMin * 1.05;
          else
            dataMin = dataMin * 1.3;

        y.domain([dataMin, d3.max(hsdata, function(d, i) { return d[1]; })]);
        hstext.remove();

        svgH.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height+")")
          .call(hsxAxis)
            .selectAll("text")
            .attr("y", 0)
            .attr("x", -10)
            .attr("dy", ".35em")
            .attr("transform", "rotate(-90)")
            .style("text-anchor", "end");

        svgH.append("g")
            .attr("class", "y axis")
          .call(yAxis)
          .append("text")
            .attr("class", "gLabel")
            .attr("transform", "rotate(-90)")
            .attr("y", 2)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text(legenda);

        svgH.selectAll(".bar")
            .data(hsdata, function(d){return d[0];})
          .enter().append("rect")
            .attr("class", "bar")
            .attr("width", hsx.rangeBand())
            .attr("y", height)
            .attr("height", "0")
            .attr("id", function(d) { return "H"+d[0];})
            .style("fill", function(d, i) {return cl.cor(d[1])});

        svgH.selectAll(".bar")
            .transition()
            .duration(1500)
            .ease("cubic")
            .attr("y", function(d) { return y(d[1]); })
            .attr("x", function(d) { return hsx(cl.nid("nome", d[0])); })
            .attr("height", function(d) { return height - y(d[1]); });

        d3.select("input#hist").on("change", hs_ordena);

        hs_hookToolTip();
        hs.legenda = legenda;
        hs_labelToolTip();
        hsinicio = false;
      }
    };

    histograma.dados = function(valor) {
      if(!arguments.length) return dados;
      dados = valor;
      return histograma;
    };

    histograma.legenda = function(valor) {
      if(!arguments.length) return legenda;
      legenda = valor;
      return histograma;
    };

    histograma.escalaY = function(valor) {
      if(!arguments.length) return escalaY;
      escalaY = valor;
      return histograma;
    };

    return histograma;
  }
  if (typeof define === "function" && define.amd) this.hs = hs, define(hs); else if (typeof module === "object" && module.exports) module.exports = hs; else this.hs = hs;
}();