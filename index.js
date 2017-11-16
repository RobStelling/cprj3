var vetDados = [];
var indMed14 = [[330010,2.65], [330015,1.89], [330020,2.33], [330022,1.87],
                [330023,4.62], [330025,2.15], [330030,2.34], [330040,2.39],
                [330045,0.90], [330050,1.71], [330060,2.54], [330070,2.05],
                [330080,2.52], [330090,2.17], [330093,2.41], [330095,1.70],
                [330100,2.46], [330110,0.74], [330115,2.58], [330120,1.88],
                [330130,2.71], [330140,0.81], [330150,1.64], [330160,1.73],
                [330170,2.36], [330180,1.73], [330185,1.63], [330187,0.58],
                [330190,2.18], [330200,2.91], [330205,0.90], [330210,1.27],
                [330220,2.68], [330225,2.89], [330227,0.82], [330230,1.23],
                [330240,2.78], [330245,1.73], [330250,0.86], [330260,2.92],
                [330270,1.60], [330280,1.94], [330285,1.51], [330290,2.35],
                [330300,1.58], [330310,1.21], [330320,2.39], [330330,6.23],
                [330340,2.31], [330350,1.59], [330360,1.36], [330370,2.73],
                [330380,1.27], [330385,0.37], [330390,3.06], [330395,1.51],
                [330400,1.88], [330410,1.14], [330411,3.51], [330412,1.25],
                [330414,0.68], [330415,1.33], [330420,2.24], [330430,1.99],
                [330440,0.83], [330450,1.77], [330452,0.95], [330455,3.19],
                [330460,0.82], [330470,0.94], [330475,0.57], [330480,0.64],
                [330490,0.79], [330500,1.33], [330510,0.60], [330513,0.88],
                [330515,1.42], [330520,0.51], [330530,0.78], [330540,1.15],
                [330550,0.64], [330555,0.31], [330560,0.76], [330570,0.61],
                [330575,0.45], [330580,2.15], [330590,0.77], [330600,2.10],
                [330610,2.20], [330615,0.49], [330620,2.10], [330630,2.61]];
        // Densidade populacional

var densidadeDemografica = [
          [330010,205.45],   [330015,107.92],   [330020,175.55],   [330022,102.99],
          [330023,392.16],   [330025,172.91],   [330030,163.7],    [330040,324.94],
          [330220,86.71],    [330225,117.41],   [330227,1166.37],  [330230,29.95],
          [330240,169.89],   [330245,67.8],     [330250,585.13],   [330260,103.25],
          [330270,351.55],   [330280,184.83],   [330285,4310.48],  [330290,85.21],
          [330300,88.15],    [330310,39],       [330320,8117.62],  [330330,3640.8],
          [330340,195.07],   [330350,1527.6],   [330360,262.27],   [330370,70.77],
          [330380,40.57],    [330385,82.68],    [330390,371.85],   [330395,296.86],
          [330400,52.07],    [330410,58.8],     [330411,326.95],   [330412,44.72],
          [330414,1822.6],   [330415,28.4],     [330420,109.35],   [330430,121.7],
          [330440,20.73],    [330450,17.9],     [330452,461.38],   [330455,5265.81],
          [330460,12.67],    [330470,67.27],    [330475,36.39],    [330480,36.84],
          [330490,4035.9],   [330500,71.96],    [330510,13024.56], [330513,27.98],
          [330515,91.87],    [330520,264.05],   [330530,22.36],    [330540,32.38],
          [330550,209.96],   [330555,275.53],   [330560,22.77],    [330570,37.67],
          [330575,211.21],   [330580,212.49],   [330590,17.44],    [330600,237.42],
          [330045,6031.38],  [330050,65.86],    [330060,59.13],    [330070,453.75],
          [330080,56.9],     [330090,26.4],     [330093,115.16],   [330095,26.47],
          [330100,43.36],    [330110,24.02],    [330115,54.07],    [330120,76.71],
          [330130,76.53],    [330140,61.08],    [330150,175.59],   [330160,29.14],
          [330170,1828.51],  [330180,99.57],    [330185,142.7],    [330187,439.91],
          [330190,506.56],   [330200,395.45],   [330205,47.86],    [330210,53.09],
          [330610,55.06],    [330615,49.85],    [330620,63.94],    [330630,1412.75]];
        // Gastos públicos por município
var gastosPublicos = [[330010,733079], [330015,33683], [330020,207828], [330022,39840],
                      [330023,187037], [330025,113846], [330030,162223], [330040,385027],
                      [330045,478570], [330050,64387], [330060,66810], [330070,713436],
                      [330080,162879],[330090,35471], [330093,2200102], [330095,70456],
                      [330100,93052], [330110,41496], [330115,53511], [330120,229645],
                      [330130,27942], [330140,55152], [330150,52135], [330160,39193],
                      [330170,1708751], [330180,38810], [330185,126728], [330187,62449],
                      [330190,517001], [330200,526967], [330205,38818], [330210,49530],
                      [330220,186489], [330225,100509], [330227,132830], [330230,30981],
                      [330240,1644367],[330245,31024], [330250,336674], [330260,231643],
                      [330270,313167], [330280,44361], [330285,184089], [330290,68223],
                      [330300,59212], [330310,47663], [330320,213349], [330330,1386517],
                      [330340,308461], [330350,899505], [330360,92933], [330370,76791],
                      [330380,152999], [330385,59410], [330390,728627], [330395,55194],
                      [330400,147762], [330410,46321], [330411,200396], [330412,48578],
                      [330414,202411], [330415,250807], [330420,328524], [330430,156346],
                      [330440,61755], [330450,37469], [330452,779309], [330455,20850692],
                      [330460,47058], [330470,84748], [330475,69777], [330480,85668],
                      [330490,894608], [330500,412555], [330510,420049], [330513,29324],
                      [330515,49627], [330520,136394], [330530,39650], [330540,54998],
                      [330550,183696], [330555,142724], [330560,97807], [330570,50453],
                      [330575,57792], [330580,335245], [330590,38050], [330600,159715],
                      [330610,134739], [330615,32632], [330620,92302], [330630,645826]];

vetDados.push({selecionado: true, dados:indMed14, distribuicao: "linear", range: ['#a50f15','#fee5d9'],
  legenda1: "Médicos por habitante", legenda2: "Médicos por 1.000 habitantes", classes: 6});
vetDados.push({selecionado: true, dados:gastosPublicos, distribuicao: "sqrt", range: ['#eff3ff', '#08519c'],
  legenda1: "Gastos públicos", legenda2: "Gastos públicos", classes: 7});
vetDados.push({selecionado: true, dados:densidadeDemografica, distribuicao: "sqrt", range: ['#feedde', '#a63603'],
  legenda1: "Densidade demográfica", legenda2: "Densidade demográfica 2010", classes: 7});

var dsv = d3.dsv(";", "text/plain");
var q = d3_queue.queue()
  .defer(dsv, "./csv/PopulacaoRJ-1990-2015.csv")
  .defer(dsv, "./csv/TDI_MUNICIPIOS_2009_loc_total_rede_total.csv", function(educ) {
    return {
      cdmun: +educ.cdmun,
      fundamental: +educ.TDI_FUN,
      medio: +educ.TDI_MED
    }; })
  .defer(dsv, "./csv/TDI_MUNICIPIOS_2010_loc_total_rede_total.csv", function(educ) {
    return {
      cdmun: +educ.cdmun,
      fundamental: +educ.TDI_FUN,
      medio: +educ.TDI_MED
    }; })
  .defer(dsv, "./csv/TDI_MUNICIPIOS_2011_loc_total_rede_total.csv", function(educ) {
    return {
      cdmun: +educ.cdmun,
      fundamental: +educ.TDI_FUN,
      medio: +educ.TDI_MED
    }; })
  .defer(dsv, "./csv/TDI_MUNICIPIOS_2012_loc_total_rede_total.csv", function(educ) {
    return {
      cdmun: +educ.cdmun,
      fundamental: +educ.TDI_FUN,
      medio: +educ.TDI_MED
    }; })
  .defer(dsv, "./csv/TDI_MUNICIPIOS_2013_loc_total_rede_total.csv", function(educ) {
    return {
      cdmun: +educ.cdmun,
      fundamental: +educ.TDI_FUN,
      medio: +educ.TDI_MED
    }; })
  .defer(dsv, "./csv/TDI_MUNICIPIOS_2014_loc_total_rede_total.csv", function(educ) {
    return {
      cdmun: +educ.cdmun,
      fundamental: +educ.TDI_FUN,
      medio: +educ.TDI_MED
    }; })
  .defer(d3.csv, "./csv/ICMSEco.csv", function(iE) {
    return {
      cdmun: +iE.cdibge,
      ProducaoEstimadaRS2011: +iE.ProducaoE2011,
      ProducaoEstimadaRS2012: +iE.ProducaoE2012
    }; })
  .defer(d3.csv, "./csv/PIBdosMunicipios2010-2013-Dadosparapublicacao33RJ(312213).csv", function(pib) {
      return {
        cdmun: Math.trunc(+pib.cod_munic/10),
        pop13: +pib.pop13,
        pib10: +pib.pib10/1000,
        ppcap10: +pib.pcap10/1000,
        pib11: +pib.pib11/1000,
        ppcap11: +pib.pcap11/1000,
        pib12: +pib.pib12/1000,
        ppcap12: +pib.pcap12/1000,
        pib13: +pib.pib13/1000,
        ppcap13: +pib.pcap13/1000,
        pibser2013: +pib.ser1_13/1000,
        pibDiff1013: (pib.pib13-pib.pib10)/1000,
        pibPCDiff1013: (pib.pcap13-pib.pcap10)/1000
      }; })
  .defer(dsv, "./csv/Trabalho_2004_2015.csv")
  .defer(dsv, "./csv/2TLuizFernandoDeSouza.csv",  function(dados) {
        return {
          cdmun: +dados.cdmun,
          votos: +dados.votos,
          perc: +dados.percentual
        }; })
  .defer(dsv, "./csv/2TMarceloBezerraCrivella.csv",  function(dados) {
          return {
            cdmun: +dados.cdmun,
            votos: +dados.votos,
            perc: +dados.percentual
          }; })
  .defer(dsv, "./csv/2TDilmaVanaRousseff.csv",  function(dados) {
            return {
              cdmun: +dados.cdmun,
              votos: +dados.votos,
              perc: +dados.percentual
            }; })
  .defer(dsv, "./csv/2TAecioNevesDaCunha.csv",  function(dados) {
              return {
                cdmun: +dados.cdmun,
                votos: +dados.votos,
                perc: +dados.percentual
              }; })
  .await(function(error, populacao9015, tdi2009, tdi2010, tdi2011, tdi2012, tdi2013, tdi2014, icmsEco, Pib, Trabalho2004_2015, LFPezao, MBCrivella, DVRousseff, ANCunha){
    if(error) throw error;
    var i;
    var pop9015 = {};

    for( i = 0; i < populacao9015.length; i++) {
      if (populacao9015[i].Código != "Total") {
        pop9015[+populacao9015[i].Código] = {2015:+populacao9015[i][2015], 2014:+populacao9015[i][2014],
          2013:+populacao9015[i][2013], 2012:+populacao9015[i][2012], 2011:+populacao9015[i][2011], 2010:+populacao9015[i][2010]};
      }
    }
    // População Residente
    var pop2010 = [];
    for ( i in pop9015 ) {
      pop2010.push([+i, pop9015[i][2010]]);
    }
    vetDados.push({selecionado: true, dados:pop2010, distribuicao: "sqrt", range: ['#feedde', '#a63603'],
      legenda1: "População Residente 2010", legenda2: "População Residente 2010", classes: 6});
    // Educação
    var fund2009 = [], medio2009 = [];
    for (i = 0; i < tdi2009.length; i++) {
      if (!isNaN(tdi2009[i].fundamental))
        fund2009.push([tdi2009[i].cdmun, tdi2009[i].fundamental]);
      if (!isNaN(tdi2009[i].medio))
        medio2009.push([tdi2009[i].cdmun, tdi2009[i].medio]);
    }
    var fund2010 = [], medio2010 = [];
    for (i = 0; i < tdi2010.length; i++) {
      if (!isNaN(tdi2010[i].fundamental))
        fund2010.push([tdi2010[i].cdmun, tdi2010[i].fundamental]);
      if (!isNaN(tdi2010[i].medio))
        medio2010.push([tdi2010[i].cdmun, tdi2010[i].medio]);
    }
    var fund2011 = [], medio2011 = [];
    for (i = 0; i < tdi2011.length; i++) {
      if (!isNaN(tdi2011[i].fundamental))
        fund2011.push([tdi2011[i].cdmun, tdi2011[i].fundamental]);
      if (!isNaN(tdi2011[i].medio))
        medio2011.push([tdi2011[i].cdmun, tdi2011[i].medio]);
    }
    var fund2012 = [], medio2012 = [];
    for (i = 0; i < tdi2012.length; i++) {
      if (!isNaN(tdi2012[i].fundamental))
        fund2012.push([tdi2012[i].cdmun, tdi2012[i].fundamental]);
      if (!isNaN(tdi2012[i].medio))
        medio2012.push([tdi2012[i].cdmun, tdi2012[i].medio]);
    }
    var fund2013 = [], medio2013 = [];
    for (i = 0; i < tdi2013.length; i++) {
      if (!isNaN(tdi2013[i].fundamental))
        fund2013.push([tdi2013[i].cdmun, tdi2013[i].fundamental]);
      if (!isNaN(tdi2013[i].medio))
        medio2013.push([tdi2013[i].cdmun, tdi2013[i].medio]);
    }
    var fund2014 = [], medio2014 = [];
    for (i = 0; i < tdi2014.length; i++) {
      if (!isNaN(tdi2014[i].fundamental))
        fund2014.push([tdi2014[i].cdmun, tdi2014[i].fundamental]);
      if (!isNaN(tdi2014[i].medio))
        medio2014.push([tdi2014[i].cdmun, tdi2014[i].medio]);
    }
    vetDados.push({selecionado: false, dados:"", distribuicao: "", range: [],
        legenda1: "Educação─────────────────────────────────────", legenda2: "────────────────────────────────────────", classes: 0});

    vetDados.push({selecionado: true, dados:fund2009, distribuicao: "linear", range: ['#fee5d9', '#a50f15'],
      legenda1: "Taxa de distorção Idade-Série (Fundamental) - 2009", legenda2: "Taxa de distorção Idade-Série (Ensino Fundamental) - 2009", classes: 7});
    vetDados.push({selecionado: true, dados:fund2010, distribuicao: "linear", range: ['#fee5d9', '#a50f15'],
      legenda1: "Taxa de distorção Idade-Série (Fundamental) - 2010", legenda2: "Taxa de distorção Idade-Série (Ensino Fundamental) - 2010", classes: 7});
    vetDados.push({selecionado: true, dados:fund2011, distribuicao: "linear", range: ['#fee5d9', '#a50f15'],
      legenda1: "Taxa de distorção Idade-Série (Fundamental) - 2011", legenda2: "Taxa de distorção Idade-Série (Ensino Fundamental) - 2011", classes: 7});
    vetDados.push({selecionado: true, dados:fund2012, distribuicao: "linear", range: ['#fee5d9', '#a50f15'],
      legenda1: "Taxa de distorção Idade-Série (Fundamental) - 2012", legenda2: "Taxa de distorção Idade-Série (Ensino Fundamental) - 2012", classes: 7});
    vetDados.push({selecionado: true, dados:fund2013, distribuicao: "linear", range: ['#fee5d9', '#a50f15'],
      legenda1: "Taxa de distorção Idade-Série (Fundamental) - 2013", legenda2: "Taxa de distorção Idade-Série (Ensino Fundamental) - 2013", classes: 7});
    vetDados.push({selecionado: true, dados:fund2014, distribuicao: "linear", range: ['#fee5d9', '#a50f15'],
      legenda1: "Taxa de distorção Idade-Série (Fundamental) - 2014", legenda2: "Taxa de distorção Idade-Série (Ensino Fundamental) - 2014", classes: 7});
    vetDados.push({selecionado: true, dados:medio2009, distribuicao: "linear", range: ['#fee5d9', '#a50f15'],
      legenda1: "Taxa de distorção Idade-Série (Médio) - 2009", legenda2: "Taxa de distorção Idade-Série (Ensino Médio) - 2009", classes: 7});
    vetDados.push({selecionado: true, dados:medio2010, distribuicao: "linear", range: ['#fee5d9', '#a50f15'],
      legenda1: "Taxa de distorção Idade-Série (Médio) - 2010", legenda2: "Taxa de distorção Idade-Série (Ensino Médio) - 2010", classes: 7});
    vetDados.push({selecionado: true, dados:medio2011, distribuicao: "linear", range: ['#fee5d9', '#a50f15'],
      legenda1: "Taxa de distorção Idade-Série (Médio) - 2011", legenda2: "Taxa de distorção Idade-Série (Ensino Médio) - 2011", classes: 7});
    vetDados.push({selecionado: true, dados:medio2012, distribuicao: "linear", range: ['#fee5d9', '#a50f15'],
      legenda1: "Taxa de distorção Idade-Série (Médio) - 2012", legenda2: "Taxa de distorção Idade-Série (Ensino Médio) - 2012", classes: 7});
    vetDados.push({selecionado: true, dados:medio2013, distribuicao: "linear", range: ['#fee5d9', '#a50f15'],
      legenda1: "Taxa de distorção Idade-Série (Médio) - 2013", legenda2: "Taxa de distorção Idade-Série (Ensino Médio) - 2013", classes: 7});
    vetDados.push({selecionado: true, dados:medio2014, distribuicao: "linear", range: ['#fee5d9', '#a50f15'],
      legenda1: "Taxa de distorção Idade-Série (Médio) - 2014", legenda2: "Taxa de distorção Idade-Série (Ensino Médio) - 2014", classes: 7});
    // ICMS Ecológico
    var prodE2011 = [],
        prodE2012 = [];
    for (i = 0; i < icmsEco.length; i++) {
      prodE2011.push([icmsEco[i].cdmun, icmsEco[i].ProducaoEstimadaRS2011]);
      prodE2012.push([icmsEco[i].cdmun, icmsEco[i].ProducaoEstimadaRS2012]);
    }
    vetDados.push({selecionado: false, dados:"", distribuicao: "", range: [],
        legenda1: "ICMS Ecológico─────────────────────────────────", legenda2: "────────────────────────────────────────", classes: 0});
    vetDados.push({selecionado: true, dados:prodE2011, distribuicao: "sqrt", range: ['#f1eef6', '#91003f'],
      legenda1: "Produção estimada de resíduos sólidos - 2011", legenda2: "Produção estimada de resíduos sólidos (t/dia) - 2011", classes: 7});
    vetDados.push({selecionado: true, dados:prodE2012, distribuicao: "sqrt", range: ['#f1eef6', '#91003f'],
      legenda1: "Produção estimada de resíduos sólidos - 2012", legenda2: "Produção estimada de resíduos sólidos (t/dia) - 2012", classes: 7});
    // PIB Municipal
    var pib2010 = [], pibPC2010 = [],
      pib2011 = [], pibPC2011 = [],
      pib2012 = [], pibPC2012 = [],
      pib2013 = [], pibPC2013 = [],
      pibser2013 = [], pibDiff1013 = [],
      pibPCDiff1013 = [];

    for (i = 0; i < Pib.length; i++) {
        pib2010.push([Pib[i].cdmun, Pib[i].pib10]);
        pibPC2010.push([Pib[i].cdmun, Pib[i].ppcap10]);
        pib2011.push([Pib[i].cdmun, Pib[i].pib11]);
        pibPC2011.push([Pib[i].cdmun, Pib[i].ppcap11]);
        pib2012.push([Pib[i].cdmun, Pib[i].pib12]);
        pibPC2012.push([Pib[i].cdmun, Pib[i].ppcap12]);
        pib2013.push([Pib[i].cdmun, Pib[i].pib13]);
        pibPC2013.push([Pib[i].cdmun, Pib[i].ppcap13]);
        pibser2013.push([Pib[i].cdmun, Pib[i].pibser2013/Pib[i].pop13]);
        pibDiff1013.push([Pib[i].cdmun, Pib[i].pibDiff1013]);
        pibPCDiff1013.push([Pib[i].cdmun, Pib[i].pibPCDiff1013]);
    }
    vetDados.push({selecionado: false, dados:"", distribuicao: "", range: [],
        legenda1: "PIB Municipal───────────────────────────────────", legenda2: "────────────────────────────────────────", classes: 0});
      vetDados.push({selecionado: true, dados:pib2010, distribuicao: "sqrt", range: ['#edf8e9', '#006d2c'],
        legenda1: "Pib 2010", legenda2: "Pib 2010 (R$ 1.000,00)", classes: 7});
      vetDados.push({selecionado: true, dados:pibPC2010, distribuicao: "sqrt", range: ['#edf8e9', '#006d2c'],
        legenda1: "Pib per Capita 2010", legenda2: "Pib per Capita 2010 (R$ 1.000,00)", classes: 6});
      vetDados.push({selecionado: true, dados:pib2011, distribuicao: "sqrt", range: ['#edf8e9', '#006d2c'],
        legenda1: "Pib 2011", legenda2: "Pib 2011 (R$ 1.000,00)", classes: 7});
      vetDados.push({selecionado: true, dados:pibPC2011, distribuicao: "sqrt", range: ['#edf8e9', '#006d2c'],
        legenda1: "Pib per Capita 2011", legenda2: "Pib per Capita 2011 (R$ 1.000,00)", classes: 6});
      vetDados.push({selecionado: true, dados:pib2012, distribuicao: "sqrt", range: ['#edf8e9', '#006d2c'],
        legenda1: "Pib 2012", legenda2: "Pib 2012 (R$ 1.000,00)", classes: 7});
      vetDados.push({selecionado: true, dados:pibPC2012, distribuicao: "sqrt", range: ['#edf8e9', '#006d2c'],
        legenda1: "Pib per Capita 2012", legenda2: "Pib per Capita 2012 (R$ 1.000,00)", classes: 6});
      vetDados.push({selecionado: true, dados:pib2013, distribuicao: "sqrt", range: ['#edf8e9', '#006d2c'],
        legenda1: "Pib 2013", legenda2: "Pib 2013 (R$ 1.000,00)", classes: 7});
      vetDados.push({selecionado: true, dados:pibPC2013, distribuicao: "sqrt", range: ['#edf8e9', '#006d2c'],
        legenda1: "Pib per Capita 2013", legenda2: "Pib per Capita 2013 (R$ 1.000,00)", classes: 6});
      vetDados.push({selecionado: true, dados:pibser2013, distribuicao: "linear", range: ['#edf8e9', '#006d2c'],
        legenda1: "Pib de Serviços per Capita 2013", legenda2: "Pib de Serviços per Capita 2013 (R$ 1.000,00)", classes: 6});
      vetDados.push({selecionado: true, dados:pibDiff1013, distribuicao: "sqrt", range: ['#99000d', '#fee5d9'],
        legenda1: "Pib: Variação 2010-2013", legenda2: "Pib: Variação 2010-2013 (R$ 1.000,00)", classes: 6});
      vetDados.push({selecionado: true, dados:pibPCDiff1013, distribuicao: "linear", range: ['#99000d', '#fee5d9'],
        legenda1: "Pib per Capita: Variação 2010-2013", legenda2: "Pib per Capita: Variação 2010-2013 (R$ 1.000,00)", classes: 6});

      // Mercado de trabalho
      var MT6A= [], MT6D = [], MT6S = [], MTTA = [], MTTD = [], MTTS = [];
      var anos = ["2013", "2014", "2015"];
      var j;
      for (i = 0; i < anos.length; i++) {
        MT6A[anos[i]] = [];
        MT6D[anos[i]] = [];
        MT6S[anos[i]] = [];
        MTTA[anos[i]] = [];
        MTTD[anos[i]] = [];
        MTTS[anos[i]] = [];
      }
      for (i = 0; i < Trabalho2004_2015.length; i++) {
        if ((j=anos.indexOf(Trabalho2004_2015[i].Ano)) != -1) {
          cdmun = +Trabalho2004_2015[i].Municipio;
          ano = +anos[j];
          MT6A[anos[j]].push([cdmun, (+Trabalho2004_2015[i]["6A"]/pop9015[cdmun][ano])*1000]);
          MT6D[anos[j]].push([cdmun, (Math.abs(+Trabalho2004_2015[i]["6D"]/pop9015[cdmun][ano])*1000)]);
          MT6S[anos[j]].push([cdmun, (+Trabalho2004_2015[i]["6S"]/pop9015[cdmun][ano])*1000]);
          MTTA[anos[j]].push([cdmun, (+Trabalho2004_2015[i]["TotalA"]/pop9015[cdmun][ano])*1000]);
          MTTD[anos[j]].push([cdmun, (Math.abs(+Trabalho2004_2015[i]["TotalD"]/pop9015[cdmun][ano])*1000)]);
          MTTS[anos[j]].push([cdmun, (+Trabalho2004_2015[i]["TotalS"]/pop9015[cdmun][ano])*1000]);
        }
      }
      vetDados.push({selecionado: false, dados:"", distribuicao: "", range: [],
        legenda1: "Trabalho────────────────────────────────────", legenda2: "────────────────────────────────────────", classes: 0});
      //console.log(MT6A["2013"], MT6A["2014"]);
      vetDados.push({selecionado: true, dados:MT6A["2013"], distribuicao: "linear", range: ['#f7fcfd', '#006d2c'],
        legenda1: "Trabalhadores admitidos no setor Serviços - 2013", legenda2: "Admitidos no setor Serviços por 1.000 habitantes - 2013", classes: 6});
      vetDados.push({selecionado: true, dados:MT6A["2014"], distribuicao: "linear", range: ['#f7fcfd', '#006d2c'],
        legenda1: "Trabalhadores admitidos no setor Serviços - 2014", legenda2: "Admitidos no setor Serviços por 1.000 habitantes - 2014", classes: 6});
      vetDados.push({selecionado: true, dados:MT6A["2015"], distribuicao: "linear", range: ['#f7fcfd', '#006d2c'],
        legenda1: "Trabalhadores admitidos no setor Serviços - 2015", legenda2: "Admitidos no setor Serviços por 1.000 habitantes - 2015", classes: 6});
      vetDados.push({selecionado: true, dados:MTTA["2013"], distribuicao: "linear", range: ['#f7fcfd', '#006d2c'],
        legenda1: "Trabalhadores admitidos - 2013", legenda2: "Trabalhadores Admitidos - 2013", classes: 6});
      vetDados.push({selecionado: true, dados:MTTA["2014"], distribuicao: "linear", range: ['#f7fcfd', '#006d2c'],
        legenda1: "Trabalhadores admitidos - 2014", legenda2: "Trabalhadores Admitidos - 2014", classes: 6});
      vetDados.push({selecionado: true, dados:MTTA["2015"], distribuicao: "linear", range: ['#f7fcfd', '#006d2c'],
        legenda1: "Trabalhadores admitidos - 2015", legenda2: "Trabalhadores Admitidos - 2015", classes: 6});
      vetDados.push({selecionado: true, dados:MT6D["2013"], distribuicao: "linear", range: ['#fff7ec', '#b30000'],
        legenda1: "Trabalhadores desligados no setor Serviços - 2013", legenda2: "Desligados no setor Serviços por 1.000 habitantes - 2013", classes: 6});
      vetDados.push({selecionado: true, dados:MT6D["2014"], distribuicao: "linear", range: ['#fff7ec', '#b30000'],
        legenda1: "Trabalhadores desligados no setor Serviços - 2014", legenda2: "Desligados no setor Serviços por 1.000 habitantes - 2014", classes: 6});
      vetDados.push({selecionado: true, dados:MT6D["2015"], distribuicao: "linear", range: ['#fff7ec', '#b30000'],
        legenda1: "Trabalhadores desligados no setor Serviços - 2015", legenda2: "Desligados no setor Serviços por 1.000 habitantes - 2015", classes: 6});
      vetDados.push({selecionado: true, dados:MTTD["2013"], distribuicao: "linear", range: ['#fff7ec', '#b30000'],
        legenda1: "Trabalhadores desligados - 2013", legenda2: "Desligados por 1.000 habitantes - 2013", classes: 6});
      vetDados.push({selecionado: true, dados:MTTD["2014"], distribuicao: "linear", range: ['#fff7ec', '#b30000'],
        legenda1: "Trabalhadores desligados - 2014", legenda2: "Desligados por 1.000 habitantes - 2014", classes: 6});
      vetDados.push({selecionado: true, dados:MTTD["2015"], distribuicao: "linear", range: ['#fff7ec', '#b30000'],
        legenda1: "Trabalhadores desligados - 2015", legenda2: "Desligados por 1.000 habitantes - 2015", classes: 6});
      vetDados.push({selecionado: true, dados:MT6S["2013"], distribuicao: "linear", range: ['#67001f', '#f7f4f9'],
        legenda1: "Saldo de Trabalhadores no setor Serviços - 2013", legenda2: "Saldo no setor Serviços por 1.000 habitantes - 2013", classes: 6});
      vetDados.push({selecionado: true, dados:MT6S["2014"], distribuicao: "linear", range: ['#67001f', '#f7f4f9'],
        legenda1: "Saldo de Trabalhadores no setor Serviços - 2014", legenda2: "Saldo no setor Serviços por 1.000 habitantes - 2014", classes: 6});
      vetDados.push({selecionado: true, dados:MT6S["2015"], distribuicao: "linear", range: ['#67001f', '#f7f4f9'],
        legenda1: "Saldo de Trabalhadores no setor Serviços - 2015", legenda2: "Saldo no setor Serviços por 1.000 habitantes - 2015", classes: 6});
      vetDados.push({selecionado: true, dados:MTTS["2013"], distribuicao: "linear", range: ['#67001f', '#f7f4f9'],
        legenda1: "Saldo de Trabalhadores - 2013", legenda2: "Saldo de Trabalhadores por 1.000 habitantes - 2013", classes: 6});
      vetDados.push({selecionado: true, dados:MTTS["2014"], distribuicao: "linear", range: ['#67001f', '#f7f4f9'],
        legenda1: "Saldo de Trabalhadores - 2014", legenda2: "Saldo de Trabalhadores por 1.000 habitantes - 2014", classes: 6});
      vetDados.push({selecionado: true, dados:MTTS["2015"], distribuicao: "linear", range: ['#67001f', '#f7f4f9'],
        legenda1: "Saldo de Trabalhadores - 2015", legenda2: "Saldo de Trabalhadores por 1.000 habitantes - 2015", classes: 6});
      vetDados.push({selecionado: false, dados:"", distribuicao: "", range: [],
        legenda1: "Eleições 2014────────────────────────────────", legenda2: "────────────────────────────────────────", classes: 0});
      // Pezão
      var E20142T_lfdsT = [],
          E20142T_lfdsP = [];

      for ( i = 0; i < LFPezao.length; i++) {
        E20142T_lfdsT.push([LFPezao[i].cdmun, LFPezao[i].votos]);
        E20142T_lfdsP.push([LFPezao[i].cdmun, LFPezao[i].perc]);
      }
      vetDados.push({selecionado: true, dados:E20142T_lfdsT, distribuicao: "sqrt", range: ['#f0f9e8', '#08589e'],
        legenda1: "2° Turno: Luis Fernando Pezão (total)", legenda2: "Eleições 2014/2° Turno: L. F. Pezão (total) ["+d3.sum(E20142T_lfdsT, function(d){return d[1];}).toLocaleString()+"]", classes: 6});
      // Crivella
      var E20142T_mbcT = [],
          E20142T_mbcP = [];
      var E20142T_vitP = [],
          E20142T_vitC = [],
          E20142T_vitPP = [],
          E20142T_vitCP = [];
      var E20142T_perP = [],
          E20142T_perC = [];

      for ( i = 0; i < MBCrivella.length; i++) {
        E20142T_mbcT.push([MBCrivella[i].cdmun, MBCrivella[i].votos]);
        E20142T_mbcP.push([MBCrivella[i].cdmun, MBCrivella[i].perc]);
        E20142T_vitC.push([MBCrivella[i].cdmun, MBCrivella[i].votos-E20142T_lfdsT[i][1]]);
        E20142T_vitP.push([MBCrivella[i].cdmun, -E20142T_vitC[i][1]]);
        E20142T_perP.push([MBCrivella[i].cdmun, E20142T_lfdsT[i][1]/(MBCrivella[i].votos+E20142T_lfdsT[i][1])]);
        E20142T_vitPP.push([MBCrivella[i].cdmun, E20142T_perP[i][1]]);
        E20142T_perC.push([MBCrivella[i].cdmun, E20142T_mbcT[i][1]/(MBCrivella[i].votos+E20142T_lfdsT[i][1])]);
        E20142T_vitCP.push([MBCrivella[i].cdmun, E20142T_perC[i][1]]);
      }

      total = 0;
      for ( i = 0; i < E20142T_vitC.length; i++ ) {
        total += E20142T_lfdsT[i][1] + E20142T_mbcT[i][1];
        if (E20142T_vitC[i][1] < 0)
          E20142T_vitCP[i][0] = E20142T_vitC[i][0] = undefined;
        if (E20142T_vitP[i][1] < 0)
          E20142T_vitPP[i][0] = E20142T_vitP[i][0] = undefined;
      }
      for (i = 0; i < E20142T_lfdsP.length; i++) {
        E20142T_lfdsP[i][1] = E20142T_lfdsT[i][1]/total;
        E20142T_mbcP[i][1] = E20142T_mbcT[i][1]/total;
      }
      vetDados.push({selecionado: true, dados:E20142T_perP, distribuicao: "linear", range: ['#f0f9e8', '#08589e'],
        legenda1: "2° Turno: Luis Fernando Pezão (%)", legenda2: "Eleições 2014/2° Turno: L. F. Pezão (%)", classes: 6});
      vetDados.push({selecionado: true, dados:E20142T_vitP, distribuicao: "sqrt", range: ['#b2182b', '#2166ac'],
        legenda1: "2° Turno: Municípios vencidos por Luis Fernando Pezão (total)", legenda2: "Eleições 2014/2° Turno: Municípios vencidos por L. F. Pezão", classes: 6});
      vetDados.push({selecionado: true, dados:E20142T_vitPP, distribuicao: "linear", range: ['#b2182b', '#2166ac'],
        legenda1: "2° Turno: Municípios vencidos por Luis Fernando Pezão (%)", legenda2: "Eleições 2014/2° Turno: Municípios vencidos por L. F. Pezão (%)", classes: 6});
      vetDados.push({selecionado: false, dados:"", distribuicao: "", range: [],
        legenda1: "────────────────────────────────────────", legenda2: "────────────────────────────────────────", classes: 0});
      vetDados.push({selecionado: true, dados:E20142T_mbcT, distribuicao: "sqrt", range: ['#f0f9e8', '#08589e'],
        legenda1: "2° Turno: Marcelo Bezerra Crivella (total)", legenda2: "Eleições 2014/2° Turno: M. B. Crivella (total) ["+d3.sum(E20142T_mbcT, function(d){return d[1];}).toLocaleString()+"]", classes: 6});
      vetDados.push({selecionado: true, dados:E20142T_perC, distribuicao: "linear", range: ['#f0f9e8', '#08589e'],
        legenda1: "2° Turno: Marcelo Bezerra Crivella (%)", legenda2: "Eleições 2014/2° Turno: M. B. Crivella (%)", classes: 6});
      vetDados.push({selecionado: true, dados:E20142T_vitC, distribuicao: "sqrt", range: ['#b2182b', '#2166ac'],
        legenda1: "2° Turno: Municípios vencidos por Marcelo Bezerra Crivella (total)", legenda2: "Eleições 2014/2° Turno: Municípios vencidos por M. B. Crivella", classes: 6});
      vetDados.push({selecionado: true, dados:E20142T_vitCP, distribuicao: "linear", range: ['#b2182b', '#2166ac'],
        legenda1: "2° Turno: Municípios vencidos por Marcelo Bezerra Crivella (%)", legenda2: "Eleições 2014/2° Turno: Municípios vencidos por M. B. Crivella (%)", classes: 6});
      vetDados.push({selecionado: false, dados:"", distribuicao: "", range: [],
        legenda1: "────────────────────────────────────────", legenda2: "────────────────────────────────────────", classes: 0});
      // Dilma
      var E20142T_dvrT = [],
          E20142T_dvrP = [];

      for ( i = 0; i < DVRousseff.length; i++) {
        E20142T_dvrT.push([DVRousseff[i].cdmun, DVRousseff[i].votos]);
        E20142T_dvrP.push([DVRousseff[i].cdmun, DVRousseff[i].perc]);
      }
      vetDados.push({selecionado: true, dados:E20142T_dvrT, distribuicao: "sqrt", range: ['#f0f9e8', '#08589e'],
        legenda1: "2° Turno: Dilma Vana Rousseff (total)", legenda2: "Eleições 2014/2° Turno: Dilma Rousseff (total) ["+d3.sum(E20142T_dvrT, function(d){return d[1];}).toLocaleString()+"]", classes: 6});
      // Aécio
      var E20142T_ancT = [],
          E20142T_ancP = [];
      var E20142T_vitD = [],
          E20142T_vitA = [],
          E20142T_vitDP = [],
          E20142T_vitAP = [];
      var E20142T_perD = [],
          E20142T_perA = [];

      for ( i = 0; i < ANCunha.length; i++) {
        E20142T_ancT.push([ANCunha[i].cdmun, ANCunha[i].votos]);
        E20142T_ancP.push([ANCunha[i].cdmun, ANCunha[i].perc]);
        E20142T_vitA.push([ANCunha[i].cdmun, ANCunha[i].votos-E20142T_dvrT[i][1]]);
        E20142T_vitD.push([ANCunha[i].cdmun, -E20142T_vitA[i][1]]);
        E20142T_perD.push([ANCunha[i].cdmun, E20142T_dvrT[i][1]/(ANCunha[i].votos+E20142T_dvrT[i][1])]);
        E20142T_vitDP.push([ANCunha[i].cdmun, E20142T_perD[i][1]]);
        E20142T_perA.push([ANCunha[i].cdmun, E20142T_ancT[i][1]/(ANCunha[i].votos+E20142T_dvrT[i][1])]);
        E20142T_vitAP.push([ANCunha[i].cdmun, E20142T_perA[i][1]]);
      }

      total = 0;
      for ( i = 0; i < E20142T_vitA.length; i++ ) {
        total += E20142T_dvrT[i][1] + E20142T_ancT[i][1];
        if (E20142T_vitA[i][1] < 0)
          E20142T_vitAP[i][0] = E20142T_vitA[i][0] = undefined;
        if (E20142T_vitD[i][1] < 0)
          E20142T_vitDP[i][0] = E20142T_vitD[i][0] = undefined;
      }
      for (i = 0; i < E20142T_dvrP.length; i++) {
        E20142T_dvrP[i][1] = E20142T_dvrT[i][1]/total;
        E20142T_ancP[i][1] = E20142T_ancT[i][1]/total;
      }
      vetDados.push({selecionado: true, dados:E20142T_perD, distribuicao: "linear", range: ['#f0f9e8', '#08589e'],
        legenda1: "2° Turno: Dilma Vana Rousseff (%)", legenda2: "Eleições 2014/2° Turno: Dilma Rousseff (%)", classes: 6});
      vetDados.push({selecionado: true, dados:E20142T_vitD, distribuicao: "sqrt", range: ['#b2182b', '#2166ac'],
        legenda1: "2° Turno: Municípios vencidos por Dilma Vana Rousseff (total)", legenda2: "Eleições 2014/2° Turno: Municípios vencidos por Dilma", classes: 6});
      vetDados.push({selecionado: true, dados:E20142T_vitDP, distribuicao: "linear", range: ['#b2182b', '#2166ac'],
        legenda1: "2° Turno: Municípios vencidos por Dilma Vana Rousseff (%)", legenda2: "Eleições 2014/2° Turno: Municípios vencidos por Dilma (%)", classes: 6});
      vetDados.push({selecionado: false, dados:"", distribuicao: "", range: [],
        legenda1: "────────────────────────────────────────", legenda2: "────────────────────────────────────────", classes: 0});
      vetDados.push({selecionado: true, dados:E20142T_ancT, distribuicao: "sqrt", range: ['#f0f9e8', '#08589e'],
        legenda1: "2° Turno: Aécio Neves da Cunha (total)", legenda2: "Eleições 2014/2° Turno: Aécio (total) ["+d3.sum(E20142T_ancT, function(d){return d[1];}).toLocaleString()+"]", classes: 6});
      vetDados.push({selecionado: true, dados:E20142T_perA, distribuicao: "linear", range: ['#f0f9e8', '#08589e'],
        legenda1: "2° Turno: Aécio Neves da Cunha (%)", legenda2: "Eleições 2014/2° Turno: Aécio (%)", classes: 6});
      vetDados.push({selecionado: true, dados:E20142T_vitA, distribuicao: "sqrt", range: ['#b2182b', '#2166ac'],
        legenda1: "2° Turno: Municípios vencidos por Aécio Neves da Cunha (total)", legenda2: "Eleições 2014/2° Turno: Municípios vencidos por Aécio", classes: 6});
      vetDados.push({selecionado: true, dados:E20142T_vitAP, distribuicao: "linear", range: ['#b2182b', '#2166ac'],
        legenda1: "2° Turno: Municípios vencidos por Aécio Neves da Cunha (%)", legenda2: "Eleições 2014/2° Turno: Municípios vencidos por Aécio (%)", classes: 6});

      preencheIndicador(vetDados);
  });

var tituloRio = "Regiões Governamentais do Rio de Janeiro";

cl.leJson("./json/BaseRJ52.json", "./csv/coordenadas.csv");

var hist = hs.histograma();

function preencheIndicador(listaIndicadores) {
  indicador = d3.select("#selecIndicador");

  for (i = 0; i < listaIndicadores.length; i++)
    if (listaIndicadores[i].selecionado)
      indicador.append("option").attr("value", String(i+1)).text(listaIndicadores[i].legenda1);
    else
      indicador.append("option").attr("value", String(i+1)).text(listaIndicadores[i].legenda1).attr("disabled", true);
}

function selRegiao() {
  var s = document.getElementById('selecRegiao');
  apagaRange();

   if (s.selectedIndex == 1) {
    cl.todasRegioes();
    cl.titulo(tituloRio);
  } else {
    cl.selecionaRegiao(s.selectedIndex-1);
    cl.titulo(cl.nomeRegiao[s.selectedIndex-2]);
  }
  document.getElementById("selecRegiao").options[0].selected = true;
}

var selInd;

function selIndicador() {
  var s = document.getElementById('selecIndicador');

   if ((selInd=s.selectedIndex-1) >= 0) {
    cl.pintaMapa(vetDados[selInd].dados, vetDados[selInd].distribuicao, vetDados[selInd].range, vetDados[selInd].legenda2, initClasse(vetDados[selInd].classes));
    hist.dados(vetDados[selInd].dados).legenda(vetDados[selInd].legenda2).escalaY(vetDados[selInd].distribuicao).call();
  }
  document.getElementById("selecIndicador").options[0].selected = true;
}

var classesInput = d3.select("#classe").on("input", redraw).on("change", redraw);
var classes;

function redraw() {
  rangeUpdate();
  d3.select("#valor-classes").text(classes = +classesInput.property("value"));
  if (cl.status == "mapa") {
    cl.pintaMapa(vetDados[selInd].dados, vetDados[selInd].distribuicao, vetDados[selInd].range, vetDados[selInd].legenda2, classes);
    hist();
  }
}

function rangeUpdate() {
  d3.select("#valor-classes").text(classes = +classesInput.property("value"));
}

function initClasse(i) {
  classesInput.property("value", i);
  d3.select("div#selecionaClasse").style("display", "inline");
  rangeUpdate();
  return(i);
}

function apagaRange() {
  d3.select("div#selecionaClasse").style("display", "none");
}