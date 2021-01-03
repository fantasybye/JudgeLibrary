(function (root, factory) {if (typeof define === 'function' && define.amd) {define(['exports', 'echarts'], factory);} else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {factory(exports, require('echarts'));} else {factory({}, root.echarts);}}(this, function (exports, echarts) {var log = function (msg) {if (typeof console !== 'undefined') {console && console.error && console.error(msg);}};if (!echarts) {log('ECharts is not Loaded');return;}if (!echarts.registerMap) {log('ECharts Map is not loaded');return;}echarts.registerMap('xiamen', {"type":"FeatureCollection","features":[{"type":"Feature","id":"350203","properties":{"name":"思明区","cp":[118.082649,24.445484],"childNum":3},"geometry":{"type":"MultiPolygon","coordinates":[["@@@B@@BB@BB@B@B@@@@A@ACA@@AAA@@B@@"],["@@DADCBC@A@A@A@A@AA@@AAAGA@@C@@@CBCBC@A@CB@@ABCBABAB@D@BDDBF@BBBBBBBDABBB@B@BABADABC@@BA"],["@@B@@ADBB@B@@@BB@@D@B@@@BBB@DA@@@B@@@@B@@@B@@AB@B@@B@@@@BBB@@DB@B@@@@@BB@@BABB@ABB@@@@B@@@BB@@@@B@@@B@@A@@BB@@BBB@@B@@@B@D@B@@D@BAD@@BB@A@@B@@@@@BABBB@@BA@A@@BA@@BAB@@@@A@@B@@@@B@BA@@BDD@@@@B@@@@@B@@@@@B@BB@@@@B@@A@B@AD@@@@BB@B@@@BB@@B@A@B@@@@BBB@@@B@@@@B@B@B@@BHB@CDS@CBGAICKKOCCEEOIEESOAAMIQOEEGIMKOAA@OBMBE@UFMFC@MHA@IJADCFAB@BADABABEHCBAB@@AFAFAF@D@D@DBDBDBB@DD@BB@@B@@BB@@B@@B@@@@@@BB@BB@BB@BBD@B@B@@@B@@@@B@@B@@@@@@@@@@@@@@AB@@@@@B@BBB@@B@BA@@BA@@@@@B@BB@A@@@B@B@@@@AB@@@@A@@B@@BBB@@BDD@@B@B@@BB@@BB@@@BBB@@BB@@@B@@@B@B@@@B@CG@AB@BB@BBA@@B@@@@@BB@@B@@BB@@@BB@@@@@B@BB@@@B@@@@@BBB@B@@@D@@@@BB@@@@@@@@B@@BA@@B@@@@@B@@@@B@@B@B@ADB@@@@@@B@@@@DBBA@A@@@@@A@@BA@@@C@@@A@@@@@@@A@@@@BA@@@A@A@A@A@@BA@@@A@@@@B@@@@@BB@@@@@@BB@@@@B@B@BB@@@@D@@@B@B@B@@@@@DABAD@@@BAB@@AAE@C@@AE"]],"encodeOffsets":[[[121027,25035]],[[120907,25035]],[[120980,25069]]]}},{"type":"Feature","id":"350213","properties":{"name":"翔安区","cp":[118.248034,24.618543],"childNum":3},"geometry":{"type":"MultiPolygon","coordinates":[["@@C@@BA@@@AAAA@@A@@@@@@A@@@A@@A@@@@A@@@@@AA@@@@@@@A@@@@@@AA@ABA@@BB@@@BB@@@@B@BBB@@BAB@BB@@@B@@BBB@@B@BAB@@@B@B@@A@@@@@A@@"],["@@B@@AB@B@@BB@BBDA@@BA@AA@@@A@A@@A@AAAA@A@A@CA@@A@A@A@@@A@A@CCA@A@CBA@ABAB@BFBBBB@BB@BDBB@H@DA"],["@@@A@@@A@A@@@@@AB@@ABA@@BC@@AA@A@A@@@AA@@AA@@A@@@AA@@AA@@@BA@@@AB@@A@@@@@A@@@A@@A@@CAB@@@@@@C@AB@@@@AA@@@@@@A@A@@BA@A@@A@@@A@@@@BCB@AA@A@A@@@@@AA@AA@@@@@AB@@A@@AAABA@@BAAA@AA@@@A@@AA@A@A@A@@@@@@@@@A@AB@A@BAB@DA@@@@B@B@@@BB@@@B@ABB@@@@BB@@B@@@@BB@@@@BB@@B@@@@@B@BB@A@DD@@@@@@BA@@@AAABA@@AA@A@@@@@@@A@@@@@C@@@AAA@@@@@A@@@@@@@@@@@A@@@@@A@@@@B@@A@@@A@@@@@@@@@@@@@AB@@@@@@@BA@@@ADABAB@BA@@@@BBB@@@BA@@DCBI@EBAJ@TAFBMIEEAC@C@U@GACGQEGOGkGA@cCOAC@EAI@EAYEQEA@KAUCIASLkXMHA@EDADABSPIF]T@BABMV@B@@IHBHDF@DJRFNJRBFDH@DDNJPFFFBDJBFAJAFEF@BDBBB@@BB@@@@@@@@@B@@@@A@@D@@AFL@@BB@@@@DA@@B@D@@B@AB@@@@@@BB@@@@B@@@@@@@@@@@B@@B@@B@@@@@@@@@@B@@@@@@B@@@B@@@A@@BB@@@@@@@@@BB@A@B@@@B@@B@@DB@@@@@@@@@B@B@@BA@@@@@@@@B@@B@AB@@BA@BB@@@@@@B@@@@B@@@@B@@@@@@@@DBA@@B@@B@@@@@@@@@@BD@@@@BABD@B@@@@BA@B@@@@@@@@BB@@@D@@@@A@AB@@AA@BA@@BBBA@@@@@@@@@A@@B@@A@@B@@B@@B@@@@@@AB@@A@@@@BB@@@@@@@@@@A@@BBA@@@@@B@A@B@@@@@B@@@B@@@@@B@@@BA@@@@@@@@@@@@@ABB@@@@@@B@@B@@@@@B@@@@@@B@@@@@@@@@@@@B@@@@@@B@@@@@@A@@@B@@B@@B@@@@B@@BB@A@@BBB@@@@AB@@B@@B@@@@@@@@@@@B@@@@@@@B@@@@AB@@@@@@@B@@@@@BA@@@@@@@@@@@@BAA@B@AAB@A@BA@B@@@A@@B@@@BN@B@@AB@BA@@@B@A@@@@B@@@@@@@@@B@@@DB@@@@B@@@@@@@BB@@@@@@BA@@@@@@@@@B@@@@@@@@@@@B@@B@@@@@D@B@@@@@@@@@B@@B@@B@@@@@@B@BA@@@@@AB@@B@B@@@@@@A@@@A@@@@@@BB@@A@B@@B@@B@A@@B@@@@@@@@@B@@@@@@@@@@@@ABBA@B@@@@@@@@@B@@@@@@@@@B@@A@@@@@@@@@@@@@@B@@@@@@@BB@@@@A@B@@@@@@A@BB@@BBB@@A@@B@@@@@@@@A@@@@@@@@B@@@@@@BBA@@@@B@@@B@@A@@@@B@@@@A@A@@A@BAB@@@@A@@@@@@B@@@@B@@@@@@@A@@BBA@B@@@@@B@@@BA@@@@@@@A@@B@A@BA@@@A@@@@@@@@@@@A@BBA@@@@@A@@@@@AA@A@B@@A@A@A@@@A@@@C@@@A@@@@@A@ABA@AB@@A@@@@B@@@@@B@@AB@BBBB@DDBBDABB@@@BBB@B@B@@ABA@DH@@@BB@@BD@@DB@A@@@@B@@AB@@@@@@@@@B@BB@@@@@B@@@@@BB@@@A@@@@B@@@@@B@@@@@@@BA@B@@@@@@@@@@@@B@@@@@BB@@@@@@B@@ABB@@@@B@@@@@@@B@@@@@@@@A@@B@@@@@B@@@@@B@@@B@@@@@@@@@B@BB@@@@@B@B@@@@@B@@@B@@@B@@@@@@B@@@BA@@BB@@BB@@DB@@@@BB@B@BB@@@B@@@@@@@@@@B@B@@A@@@@@@@@B@@@@A@@@@BA@@@A@ABADA@@@AB@B@@@B@@@@B@@BB@@@AB@@AB@@A@BB@@@B@@AB@@@BBBB@@BB@BB@@@B@BB@B@B@@DA@@@AD@@B@AB@@@BB@@@B@BBA@ABB@A@@B@@@B@BB@A@A@@BB@@B@@@B@@AB@@@@BB@@@BBBAB@@@@@B@@@@ABA@@@@@A@A@@@@@@B@@AB@@@@A@@B@@AA@@@@@@AB@@ABABA@A@@@A@A@@B@D@BA@@@A@A@@@@@A@@@A@@@A@@@AB@@@@A@A@@AA@A@A@@@A@C@@@A@A@@AA@C@A@@@C@@BAB@BBAB@@@@BB@@@@@BB@@D@@@@@BB@B@@AB@@@@@B@@@B@@@B@@@B@@AB@@@DB@B@@ACA@@B@B@BA@@@A@@@A@A@@@@B@B@BA@@DAB@D@@@@@@BB@@@@@BBB@@@@@@@@@@@B@@@@@@B@@@@B@@@@B@@@B@@@@@B@@BBA@BBB@@@BBB@@B@@B@@@@@B@B@@AB@@AB@@A@ABA@@@@AAB@@@B@@@BB@@BBBB@@@ABA@AB@@AB@@AB@B@@BB@@@B@@@@A@@@@@@B@@B@@@@BB@@@@@@BB@@BB@B@@@@BB@@B@B@@BB@@B@@BA@@BA@@B@BBB@@@BB@@B@@@B@@@@@BB@@B@B@@AB@DA@A@@@@@A@@@AB@@@B@B@@@BD@@BAB@B@B@@@B@B@@A@@B@@AB@@@DA@AB@@@@@B@@@B@@@@A@@@A@@@AAA@@@A@@ACA@@AA@B@BA@@BAA@BABB@@@@B@BABAB@@@@@BA@@BA@@@@AC@@BAFA@@DAB@B@@ABABABA@@@@@C@@@A@@BAD@@@B@@@BAB@B@@@AC@@AA@@@A@ADAB@B@@ABA@@A@@@@@@@AAA@BA@A@@AA@A@@CAA@@@AAB@B@@ABA@A@@@@B@@@@@BA@@B@@@B@@@@A@@BA@@B@@AB@DABADBABBD@B@@BB@B@A@@B@@@B@B@B@B@@@B@@@@A@@@@BAA@@AB@@A@AB@@@BA@@@@@@A@@@@@A@A@@@A@@ADA@@BA@@@@A@@@A@@AB@@@@@@@@A@@B@@BB@@@@@@AA@@@@A@@A@@@@@A@@@@BA@@@@@@B@@A@@@@BA@@@@@@@B@@@@@@@@B@@A@@@A@@@AB@AAAAA@A@@A@A@@A@@BA@@BC@A@AB@BAB@B@@@AA@@A@@@@@A@@@@@BA@@AAA@AA@A@A@@@C@@@A@@AA@@@@BA@@@@@AEAAA@@@BABABA@@B@B@@@@AA@@@@A@@A@@@@A@@@@@@@@@@AAB@A@@@@@@A@@A@@@@A@@@@@ABC@A@@@A@@A@@A@@@A@@A@@@@@@@@@A@@@@AA@@@@@@@@BCB@@AB@@A@@BA@@B@@@@B@@@@@A@@@A@A@@@@A@AA@A@@DAB@@AB@@@@A@@@@A@@@@AA@@@@ABBB@@@B@@@@@B@@A@@@@@A@@@@AA@@A@@A@@@@@@@@B@@@@A@@@@@AB@@B@@@@@BBBB@@@B@@A@@BA@@BDB@B@@@B@@@BA@A@@@@A@@@B@@ABBBABA@A@@@AA@@@@@@A@@@A@@B@@@@A@@F@BA@@@@AA@A@@AA@@AA@@@@@@@@@AAA@@@@A@@AA@@@@@@@@@A@@A@A@@A@@AA@@@A@@A@@@A@@@A@A@@@A@@@@C@A@@@BA@@@AAAAA@A@@@@AA@@AC@@AA@@@@@@A@@@AA@@AEB@BA@@@A@@@@BA@@@@B@@A@A@@B@@@B@@AB@@@B@@B@@BA@@BC@AB@@AB@BB@AB@@@B@@@@A@@@@B@@@@A@ABB@BB@@@@A@@BA@@@@@@@@@@B@B@@A@@@A@A@@AACA@@@@@A@@@A@A@@B@@A@@@ABA@@BDBA@AB@BA@@B@@@BAB@B@@A@@@A@@DAB@@@BA@@@AB@BA@@ACAA@A@A@C@@@A@C@A@@BA@A@@@AAAA@AA@@A@A@@A@@AA@@AA@AA@CABA@ADC@@@@"]],"encodeOffsets":[[[121257,25141]],[[121233,25149]],[[121186,25231]]]}},{"type":"Feature","id":"350205","properties":{"name":"海沧区","cp":[118.032984,24.484685],"childNum":1},"geometry":{"type":"Polygon","coordinates":["@@AIAMAM@K@@YDQASAgMEPCRIJIDiRQHBD@N@J@BAB@@BDF@@BB@ABB@@@@@BFGBBD@@@@B@@@B@@@@B@@@@@@B@@BA@@@@B@B@@@@@@B@@@@@@@@@@@@@B@@@@@@B@@@@@B@B@B@@BBA@@@@@BB@@@@@@@@@B@@@B@@BD@@DF@@A@@B@@A@@@@BAB@D@@@@ABCD@@BD@@@BA@A@@@@@A@@@A@ABABABABA@@@@@A@@@A@@@@@AB@@BB@@AB@@@@@B@B@B@B@@A@C@ABCACBA@A@AD@@@B@@A@AB@@@B@@BB@B@B@D@@@@AB@@@@A@@@@@@@@BA@@@@@@@@@@B@@@@@@@@B@@B@@A@@@@@@@A@@@@@AB@@@@@@@B@@@@@B@@A@@@@B@@@@@@@@@@@@@BAA@B@@@A@@@@@@@@@@A@@@@B@@@@AA@@@@AB@@@@AB@A@@@@AB@A@B@AAB@@@@@@ABA@A@A@@A@@@@@@@@A@A@@@A@@@@@@@@BA@@@@@@@@B@@@B@@@@@@A@A@A@@@@BA@@@@@AB@BB@AD@@@@@D@B@@A@@@@@@@@B@@@@@@@@A@@@@@@@@B@@B@@@B@@@@@@B@@@@@@@@@@@@@@@@@B@A@B@@@@@@@B@@@@A@B@ABB@A@@B@@@@A@@B@@@@BA@@@B@@@@@@@B@@A@@@@@@@@@@B@@@@@@A@@@@@@@@@@B@@A@@@@A@B@@@B@@B@@B@@@@A@@@@@@@@@A@@@@@@@@@@@@@@BB@@@@@@@@B@@@@@@B@@B@@BB@@@@@@A@B@@@@B@@@@@B@@BB@B@@A@@B@@DDB@BB@@@B@@@BAB@DA@@BAB@B@BA@AAABC@@@A@ABA@@BA@@BABA@@BA@@@AB@BA@AB@BA@@BCBAB@@@@A@@@@@ABA@@@@@A@@@AB@B@@@B@@@@B@BB@@@@@@B@@@@@@B@BBB@B@@DB@B@@B@AB@B@@@@@B@BADBB@@B@@BABAB@B@@@B@B@@@B@@@@@B@@@@B@@B@@@@@B@@@@B@@@B@@@@@B@B@B@@@BA@@@A@@B@BBB@@@B@B@@@@@B@@@B@B@B@@@BA@@B@@B@@@@B@BA@@BB@@B@B@@@@@@@B@@@B@@@B@B@B@B@@@@@BB@@@B@BB@@B@@@@BBBBB@@B@B@B@BBB@DBD@@@BB@@@@BB@@@@BBB@@BB@BBBB@@@BBB@BB@@B@B@DB@@B@@@@BB@@B@@@BB@@DB@A@B@@@@AB@@AB@@A@@FCB@D@@AB@@@@A@A@@BA@@@@@@BA@A@@@A@@@AB@B@@A@@@@AA@@@@@@@A@@AA@@@AA@A@@@@@@BA@@@@@A@@@@@@AA@@@A@B@BA@@@@@@C@@AA@BAB@@A@@BA@@@A@A@AB@AA@@@@@@@@B@@@@@B@@@@A@@BA@@@@@@@@@@AB@@A@@@@AA@@AA@A@@@@@@@A@@@@@@A@@@@@@@@@@A@@A@@B@A@@A@@B@@@@@@@@@A@B@BB@A@@@@@A@@@A@AB@A@AA@A@@@@BA@@AA@@@@@@@@@A@@@BBA@@B@@@@A@B@@@@BA@@B@@@@@@@@@@A@@@AAAB@@B@BBA@@@@@@@@@@@A@@@A@@@@@A@@BA@@@@BA@@BB@A@AA@@@B@@@@@@AB@A@AA@@B@@@@@BA@@@A@@BA@@@@A@@A@@B@@@B@@A@@A@@AB@@@B@@@@@@A@@B@@@@@B@@A@@A@DA@AA@A@@@@@B@@AA@@@@@@@@@@@@AB@@A@@B@@@@@BBB@B@@@@@@@@@B@@@@@@@@@@@@BB@@@@@@@@@@@B@@@BAB@@B@A@B@@@@@@@@BA@@@B@@@@@@B@@@@A@@@@@@@B@AB@@@@@@@@@@@B@@@A@@AB@@@@@@@BA@BBA@@@@@@@@@AB@@@B@@@@@AA@@@@@@@@B@@@@@@@@A@@@@B@@@@AA@@@@@@@@@@@@@@@@@BA@@@@@@@@@@@ABB@@@@@@@@@A@@B@@@@@@@@@@@@A@@@@@@@@@@B@@@@@@@@AA@@@@@@@B@@@@@@A@@@B@@BAA@B@@A@@BB@@@A@@BB@@@A@@@@@B@A@@@@B@@@@@@A@@B@@@@@@@@@@@@@@@@@@@@@@@@@@@@@B@@@@@@@@A@B@@@@@@@@@@@@@@B@@A@@@@@@@@@AA@@AB@@A@@@@@@A@@@@@@A@@@@@A@BA@@A@@BA@@@@A@@AB@@@@@AQ@@@@@AD@NABAVAF@VCD@`CNAPApGZCEEACAA@AAGGUCGGY@@@ACO@@AEAEAE@C@AAC@AAA@EAEAEEECC@@@AAC@@AACA@AEIAG@C"],"encodeOffsets":[[120886,25030]]}},{"type":"Feature","id":"350206","properties":{"name":"湖里区","cp":[118.146768,24.512904],"childNum":2},"geometry":{"type":"MultiPolygon","coordinates":[["@@@@C@@B@@@B@@B@H@@@@A@@A@AAA@"],["@@@A@@@@A@@@@AA@@AA@@@AAC@B@BP@HBDBN@@BFBFJ\\FPBHDLBBBBBHDFFHHHHDBBDB@@DDFBVDPDJDFBF@B@FAFEFIDGFCF@H@PCNCFCXINKFIDOB[GA@AA@A@A@@@@@@A@@AA@A@@A@B@A@@@AA@@A@A@@A@@C@@B@A@BA@@@@@AAA@@@@@A@@@@@A@@@@@CC@AB@@A@A@@A@@@@B@@A@AB@@AB@@@BAB@@AABA@A@@@@@AB@A@@AC@ABC@@@@A@C@A@@@AA@AA@@AA@@@BA@@@A@@@@@AA@@A@@@@@AA@BAAAB@@AA@@@@A@A@@CA@AA@@@@@AA@A@@BA@@@A@@@@@@A@@CBA@AA@@A@C@@@AA@@A@A@CA@BA@BF@@@DBF@BA@AB@@C@ABCB@@@@A@A@A@@@C@@@@@AAA@A@@@@@AA@@@@@@AA@@@@A@@@@@@B@@AB@@@B@B@B@B@@AB@@@@@B@@@@@@@B@@@D@@AB@@@B@@@@@BABCA@@@@@A@@@@A@BCA@A@@@@A@@A@@@@@A@@@AB@@@A@@@@@@A@@A@@C@@@A@A@AA@@@@A@@@A@@A@A@@@@AA@@A@@AA@@@AA@@@@A@@@AB@AAAA@@BDHA@@@A@A@@@A@@@A@@AA@AA@@A@@AA@@AA@A@@@CC@AA@AA@@@AB@@@@@BA@@@@@A@A@@@BAAA@@@@@B@@AB@@A@AA@AAA@@@@@A@@B@@@@@@@@@@@@A@@@@A@@A@@@A@A@C@AAA@@AAAA@"]],"encodeOffsets":[[[120993,25143]],[[120912,25066]]]}},{"type":"Feature","id":"350211","properties":{"name":"集美区","cp":[118.097337,24.575969],"childNum":1},"geometry":{"type":"Polygon","coordinates":["@@GEAAGE@@CECEAECCAACAA@AAEAGIIOYDoHOBMB_DC@UDE@UBABMBC@@B@@@@BR@@@@A@@BB@@@@@AB@@@BB@@A@B@@@@@B@@@@B@@@@@@@@BA@@BB@@B@@@@@@@@@BA@@@@@@@@@@@@@@@@A@B@@@@@@A@@@@@@@@@@@@@@@@@@@@@@@@@@@@@A@@@@B@@@@A@@@@@@B@A@@@@@B@@AA@@@B@@AA@@@BA@B@AB@@@A@@@B@@@@A@@@@@@@B@@B@@@@@@A@@@@@@@@@@@@B@@@@@@@@@@A@@@@B@@@@@@@@AA@B@@@@@@@@@@AB@@@@@@@@@@@@@@@@B@@B@@A@@@@@@B@@@@@@A@@@@@@@@@BB@@@@A@@@A@@B@@@@@@@@AB@AAB@@@@@@A@@BB@@@A@@@@@@@@@@@A@@B@A@@@@@@@B@@A@@@@@@@@A@@AB@@@@@@@@@A@B@AA@AB@@A@@@@@@@@@@@A@@A@@@@@@@@@@A@@@@@@@@@A@A@AA@@@@A@@@@BA@@B@@@@@@@@@@B@@BA@@@@@B@B@@BCBB@@@@BA@@@@@A@@@@B@@@@A@@@A@@BB@@@@BA@@@A@@@@BB@@@@@AB@@@B@@AB@@@@A@@@BBB@A@@B@@@@A@@@B@@B@BAA@@AB@@@@AB@@@B@@@@@B@@@B@@@@@@@@@@AB@A@AA@BB@B@@@B@@@@@@@@A@@@AB@@@@@A@B@@A@@@AB@A@@@B@@@@@@@@BB@@AB@@@@@BBBB@A@@B@B@@@B@@@@@BAAA@B@@@@@@@@@A@@@@BB@A@@@@BB@@@@@@@@@@@@B@@@@B@@@@@@@B@B@@BB@@B@@B@@@BA@@@@@@@@@@AB@@@B@@A@@@@@A@@@@@@@@@BBA@@B@B@B@@AB@@@BA@ABB@@BD@@@@@@@ABA@B@@@B@@B@@@@B@@@@@B@@A@@@@B@B@@B@@BB@@@B@@@@@@BB@@@@@BA@A@@B@@@B@@@BAB@@@@@@AB@@@B@B@@A@@BC@A@ED@@@BA@@BA@@B@@DD@@B@@BB@@B@@B@D@@@B@B@@BB@BB@B@F@@@B@BDB@@@BB@@@B@B@@@BBB@@B@@B@BB@@@@@BB@BB@@@B@@@@@BABAB@@@@AB@@@@@@AB@@@B@@B@@BBB@@@@BB@B@@BB@@@@@BAB@B@@@B@B@D@B@@AB@BAB@@@B@@AB@@@@AB@B@@@@@B@@@@@BAB@@AB@B@B@@@BA@@B@@A@@BA@@B@@AB@@@B@@@@@@@@@B@@@B@@@B@@@BBBA@@@BB@@@B@@AB@@@BA@A@@@@@A@@@A@@B@@@@@BA@@@AB@@@@A@@BA@@B@B@@@D@@@B@B@@@BA@@BA@@@B@AB@B@@@@@B@@@B@@@BA@@B@@@BAB@BAB@B@B@@A@@@@B@BB@@@AB@@@@@@@DAB@@@BB@@B@@@B@@@B@@@B@@@B@@B@@@@@@BB@@@@B@@BB@@@B@BAB@@@@BBDB@@@A@@@@BABAB@B@@AB@BADA@AB@@AB@@@BABA@@@AB@@@@A@@BA@@@AB@@@@B@@@@B@@BB@@BDBB@@BBBFB@B@@@@@@@BA@@@@@@@A@B@@@@B@@@@@@@@@@B@@@@@@@AB@BAB@@D@@@@@B@B@BC@@@@B@@@BA@@@AB@BABB@@B@B@B@@@B@BC@@DA@@BAB@@@@@@A@A@@@A@A@@@A@@@AB@@@@@BA@@BA@@@AB@@AB@@@B@B@D@@BABDBBB@@@@B@B@@@B@B@@@BBF@@BB@@@B@@@BAB@@@@BB@@A@@@@BA@A@@@@@A@@@@@A@@BA@@@AA@B@@A@@@@BA@@@@@A@@@A@@@@BA@@B@BA@@B@@@@@B@B@@@BAB@B@B@@@@A@@B@@A@@B@@@@@B@@@BA@@B@@A@@@A@@BA@@@@BA@AB@@A@@@@@AB@B@@ABA@@B@@A@@@@AA@AA@@@A@@@A@@AA@@@@A@AA@@A@A@@A@@A@@@@@A@@B@@@@@B@BA@@@A@@@AB@@@BA@@@@@A@@B@B@@@BA@@@@@@BA@@BA@@@A@@@@AA@@@@BA@@@C@@@@B@@AB@@@@AB@@@BAB@@@B@@ABB@AB@@ABAAAB@@ABAB@@@@A@@B@@A@@@AB@@AAA@@@A@@@@@A@@@@@A@@@@@@@AB@@@B@@@B@@@BA@@@@B@@A@A@AB@B@B@@ABA@@@@@@@A@@@@B@@A@@BA@@@AB@@@BB@@@@B@@@BB@A@@BBB@BC@@@@B@BA@@B@@@@B@@B@@@BB@ABBB@@@@@B@@@@@B@BABBB@@@@A@@B@@AB@@A@@@AB@B@@@B@@@BB@@BA@@@BB@B@@@BA@@@@@AFC@@B@@AA@AAAA@A@@DCAGBA@AB@@@@A@@@@@AA@@@BA@@BAB@BAB@BA@@DED@@@B@B@@@@ABABA@@@@BAB@B@@@B@@@B@B@@@BA@@@A@@@@@@B@@@BADB@@B@@AB@@C@@BA@ABB@A@@B@B@@@@@@@B@@AB@@@@B@@@@BB@@@AB@@A@@@@@A@@@@@@B@@A@B@@BA@@@A@@@@A@@A@@B@@@@@@@@@@A@@B@@@@@@@@@@@AAA@@@C@@@DE@@AABA@@@@A@BA@@@@@@B@@@A@@A@BAAA@@@@A@@@A@@@A@@@@@@@@A@@@@@@B@@@A@@@@@@@@@A@@@@@@@@@@@@@A@@@AB@@@@@@A@@B@@@AA@@@@@@@@@@@@@@@A@@B@A@@@@@@A@@@@B@AAB@@@BB@@@@@AB@A@@ABA@@BAHIV]GCECQGA@@@CACA"],"encodeOffsets":[[120957,25160]]}},{"type":"Feature","id":"350212","properties":{"name":"同安区","cp":[118.152041,24.723234],"childNum":1},"geometry":{"type":"Polygon","coordinates":["@@@CCEAGGHABAB@BCAEAGCU^GJAB@@AB@BB@A@@B@@@@AA@@A@BBA@@@@@@B@@@@B@A@@@@B@@@@@@@@@@@@@@BB@@A@@@@B@@@@A@@B@@@B@@@@@@@@@@@@@B@@@@@@@@@B@@@A@@@@B@@@@@@@@@@B@@@B@@@B@@B@BB@A@BB@@@A@@@@@@@ABB@@@@@ABBB@@CF@@D@@@B@BB@@@@@@@@@@A@@@@B@@@@@@@@A@@@@BB@@@@@@B@@AB@@@A@BA@@@@@@@@B@@@@@BA@@B@@AA@@@@@A@@A@@BA@@@@@@@A@A@@@@BAA@BAB@@@DA@@BA@@@CAAB@@A@@@@@@@@B@@AB@@A@A@@@A@@@A@A@AB@@@@ABAB@B@@A@A@@@C@CF@@ABA@ABA@AB@@AB@@B@@B@@@@@B@@A@@BABBHCD@@@BBBBBB@@BA@@@ED@B@@@@AB@@A@A@@A@@AB@@AA@@A@@@A@A@@B@@@BA@@BA@@@@B@@A@AAABA@@@@@A@@@@@A@AA@BAA@@A@@@@A@@A@@@ABA@@@@@ADA@AA@@@BAA@@A@@@@@AA@@A@@B@@AB@@@BA@@@@@@B@@@@@@AB@BA@A@A@@B@B@BA@@@@@AB@@A@@@A@@@A@@B@@@@@@@B@@@@@B@@@@@B@@BB@BA@@B@@@BA@@@@B@@A@AB@BA@BBAB@BA@@BAA@BA@@@A@AB@@A@@B@@A@@BA@@@@@@D@@AB@@@@BB@@@@@B@@AB@@AB@@@@@@AB@@A@A@@@@B@@@@AB@@A@@B@@@B@@ABA@@@@@A@@@@B@@@@@BB@@@@B@BB@@B@B@@B@@BB@@@B@@@B@@BBB@@@@@BA@@@AB@BA@A@@B@@@@@BA@@BAB@@@@AB@@@B@@@BA@@@AB@@A@@@@@A@@@@BA@@@@B@@A@A@A@AB@@A@A@@@@@A@@@ABA@@@AB@@@@@B@@@B@@@@AB@@@@@BA@B@@B@@AB@@@B@@@@@B@@@@@BAB@@@@@BA@@A@@A@AB@@A@@@A@@AE@AA@@A@A@@@A@A@@@@@AACABA@AC@A@A@@@A@@BA@@B@@AB@@AB@@@@A@@B@@@B@@@B@B@@@B@B@@@@A@AB@@CB@@ADA@@@A@A@A@@@AAABA@@B@@AB@@A@@@@@ADA@A@@@@@C@@@BA@ABA@@@@@@A@@@@@@@@@@@@A@@A@B@@@@@@@B@@A@@@@@@@AEAAA@AA@CA@AA@@AA@@@@@@A@@A@@B@@AB@@@B@@A@@B@@ABAB@@A@@BA@@BCBABA@@BA@A@ABAB@@@@@B@@A@@B@BB@@D@@@B@@@BBB@@@@@B@B@@A@ABAB@@@@BB@@B@B@B@@@B@@BB@@@B@B@BB@@BB@@B@@@@@@BA@@B@@@BB@AB@@@@@B@@B@@B@@@@@@@BB@B@@B@BB@@B@@@BB@@B@@@B@@B@@@@B@@@BBDABBB@@@B@@@@@B@@ABBB@@@B@@@@B@@@@B@@@@@@@B@@ABB@@B@@B@@B@B@@@BABA@@B@@@@@BA@@B@@@B@@@B@@@B@@@B@@@BABBBABBBAB@B@@AB@B@BB@@@B@@@B@@B@D@@@BBB@B@@@BABADABB@@D@@B@@B@BAD@@@@BB@B@@@D@@B@ADBD@@@@BD@@@@BB@BA@@B@B@@A@A@@@@@@BA@@@@@A@AB@@A@C@@@@B@@AAB@@@@AA@A@A@A@B@AA@@@@A@@@A@@@A@@@AAA@AA@@@AABA@EB@@@@@@@@BB@@@B@@@@A@@@@@A@@@@@@B@B@@ABABAB@BABAB@BA@@F@@A@@BA@AB@@A@@B@@@BA@@@@BA@@@@@A@@B@@@@A@@@@@AB@@AAA@@@AB@@@BA@@B@@A@@@A@@@A@AB@@AB@DA@@@A@A@@@@@BD@BBB@@BD@BB@@BB@@FB@BD@@@@BA@@@A@@D@B@BABCBAB@@AB@B@@@B@@AB@@AB@@@@@@ABABA@ABA@A@AD@@@@BB@D@@@BB@@B@B@@BB@B@@@@B@@B@B@@@@BBA@@BBB@@AD@@A@@@BB@BB@@@@@@B@BAB@@@BA@@@ADABAB@@@BA@A@@@A@@B@@@AABA@@@A@A@AB@@@@@B@@@@@@@@@@A@ABAA@@@@A@@@@B@@@B@@A@@B@@@@@@@B@@A@@@A@@@@@AB@@@BA@AB@D@@@@@@@@BA@@B@@@@BBB@D@@@BA@@@@DBB@BBBBD@BBBBB@@@B@@@@@BB@@@BB@@@B@@@B@B@@@@@B@B@BB@@@@B@@@@B@@@@@B@@@@BB@@BB@@@BA@@A@@@@A@@@@@ED@@@@AB@BA@@BA@@B@H@@@@BB@BB@@B@@B@B@@BB@@@@@@@@B@@@BB@@@B@@@B@B@BB@@@@B@@@B@@@@AB@@A@@B@BA@@B@@@@@BA@@B@@@BAB@@@B@BB@@B@@@@A@@BBBDB@@@CB@B@B@@@BABA@AB@@@BCB@@A@@@A@@@@BA@@@A@@@@@AB@@B@@@@@BBA@@@BBA@@BABA@@@A@@@@ACA@B@@ADA@@BAA@B@BA@@@@A@@@@AA@@A@@BA@@@@@A@@@A@ABABA@@@@B@B@@@BB@@@B@B@BB@@@@@B@@@@@B@@@@B@B@BA@B@@@@B@@AB@D@D@@A@@@@BA@A@@@ABA@@@@B@@@B@B@B@@@@@@ABA@@@A@@B@B@@@BB@@B@B@@@B@@@B@@@B@@BB@A@BBA@@@@@AB@@A@@@BBAB@B@@@@BB@@@@@B@@@@@BA@BB@BB@@@@B@@BAB@B@@@BA@@@@B@@AB@B@@@B@@@@@B@B@@@BABA@@BABA@ABB@B@@B@B@@@@@B@@B@@B@@@B@@@B@B@@@BA@@BA@@@@@A@AB@@ABA@@@A@@@A@@@@A@@@A@@@AA@@@@@C@@@@BC@@BAA@@@BA@AB@@@@@@@AA@@@@@@@A@@@@BAB@BA@@B@BADA@@B@D@@A@@@@@AA@@A@A@ABAA@@A@@BAB@BAB@@@BA@@BA@@BAB@@@B@BBBA@BB@@B@BBB@@ADBB@@@B@@@@BB@@@B@@B@@@@@@@BAB@B@@@B@B@@@@@@@B@@@B@@@B@@@@ABB@@@A@@@@@AAA@A@@@AA@@A@ABA@A@A@@@@AA@@@@AAB@@AA@@@@A@@@@@A@@@@@A@@B@@A@@@@@A@@@@@@@@@A@@@@A@@@@A@@@@@A@@@@@@B@@@B@@@B@B@@A@@B@B@D@@B@B@@@@BB@@@BB@@@@BBB@@@BBBBB@BB@B@@@@BB@B@@@BBBB@@B@@@BBDB@@B@@BB@@@@@@@@B@@B@@B@B@@B@D@D@B@B@@@B@@B@@BA@@B@@@BBA@@B@@@@@B@@D@@@BAB@B@B@B@@@@@BDBB@@@@@BBB@@BBDD@@BBBB@@B@B@@@BB@B@BB@@BB@BBB@@BB@@@B@BB@@B@@BB@@@@@B@@@@BB@@@B@B@@@@B@@@@@@@@B@@@BB@A@@B@B@BAB@@@B@@@B@DAB@@@@@B@@@B@B@B@@@B@B@B@B@@@BBBBBD@@DBDB@@BA@@B@@@B@B@@@@@B@@@@@B@B@@@B@BB@@DABADA@@@A@ABAB@@@D@B@B@@@BD@@@@B@@@@@B@@AB@BAB@DB@@@AB@@@@ADB@@B@@BB@B@@@@ABA@AB@B@@A@@@@@@@ABABA@@BAB@@ABC@@BAC@A@A@A@AA@@@A@AA@@AA@@@AA@@@@@AACA@@AAA@@BA@@BABA@@BABA@@B@B@BA@@@@DABAB@@@@ABA@@@BB@@@@@DBBA@CB@@A@@DC@@D@@@B@@@@A@@@ABA@@B@B@@@@@BA@@B@@A@@B@@@@@@@BA@@B@@AB@@@@BB@@A@@B@@@@@BA@@@@@@@@@AA@@@AA@@@ABA@@BABA@@AA@@A@A@@@@@A@BA@AA@@A@AB@@A@@BA@A@@@@BA@@BA@@@@@AB@BA@@BA@@@AA@@C@@BA@@@A@@@A@@@A@@@A@@@@BA@@@AAA@@@@C@@@AA@@@@A@@A@@A@AB@ABA@AD@@@B@D@B@@BB@B@@@D@B@@@B@B@B@@BB@B@@@@@BA@@B@@@B@@@B@@@@@B@B@@@B@@A@C@AB@B@@@B@B@BABA@@BA@@@@@@BB@@@AB@@@@@BA@@@A@@@@B@B@@@@@B@BA@@@@@A@@@@BAAA@A@@AA@@@@BA@@@A@@@AA@@AB@B@A@@A@A@@@AB@A@BAB@AAA@@@A@@A@@BAA@@@BC@@B@@CA@A@A@@A@A@@AAA@@AA@AA@A@@BA@@@A@@AAB@@@BA@@BA@@A@@AA@@@@@@A@@@ABA@@B@BCBAB@@@B@@A@@B@@@@@@A@@@@@@B@@@@A@A@@@@@@@@A@@@A@@A@AAA@@@@CA@@AA@@AA@@AB@@A@@@@@@@@A@@@A@@@A@@@@@A@A@@@@AAA@@@@@@@@@A@@@A@@@@@A@@@@@A@@@@B@@@@@@A@@@@@@@A@@@@@AA@BA@@@@@@@AA@@@@A@@@@@@@@@@@@@@AAB@@@@@@A@@@@@A@@@@@@B@@AA@@@@A@@@@@A@@A@A@@@@@@@@BA@@@A@@B@A@@CC@@AA@@A@@CGB@BA@@@A@AAA@A@@AACBAACCA@AA@ABA@@@A@@@@@A@@B@@@BAB@BAB@@@@@B@@@D@@@B@@@B@B@B@@@@A@BBB@@@@B@@@@@B@AAB@@@@@@@@@@@B@@@B@@A@B@AB@@@@@@@B@@A@@@A@@@@@AAB@AB@@@@@@@A@@@@@@A@@@@B@@@@@BA@A@BB@B@@@@@@A@@B@@@@A@@@A@@B@AA@@@@@@@A@@@@@@B@@@@@@@@@@AB@@@AA@AA@@A@B@@@@A@B@@@@@AA@@@@@@A@@@@@@@@@@@@@@@@BA@@@@@@@@@A@@@@@@@@@A@B@AA@B@@@@@@@@@@A@@@@@@@@@A@@@@B@AA@@@@A@BA@@A@@@@B@@@B@@@@@@@@A@AA@@B@@@@ABA@@@@@@@@AA@@@@A@@@@@@@@@A@C@@@@@AA@@@@@@@@@@@A@@@@@@@@@B@@A@@@@A@@A@@@@@@@A@@A@@C@@@A@@@@@@@@@A@@B@A@@@B@@ABA@@@AAM@@A@@@@B@@@AABB@A@BBA@B@AB@@@@@@@@@@@@AB@@@@A@@@@@@@A@@B@@A@@@@@@@A@@@@@@@@@@@A@@@@AA@@B@@A@AA@@@BAA@@@A@@A@@@@AA@@@B@@@@@@@@A@@@@A@@@@@@@@@@@@@@A@@@@A@@@@@A@@@@A@@@@A@BA@@@@@@@@@@@@B@@A@@@A@@@@@A@@@A@@@@@A@B@A@@@@AB@AB@@@@@@@@@@@AA@@@@@BA@@B@@@@A@@@@AA@@@@BA@@@@B@@@@@@@@ABAA@@ABB@@BA@@B@B@@C@@@A@@A@@@@@@A@B@@A@@A@C@BA@A@@C@@A@@@@@@@@A@@@@AB@CA@@@@@@@@@A@@A@@@@@@A@@@@A@@AAB@@BAA@@@@A@@@@@@B@@AA@A@@@@@@@@@A@@CA@@@@A@@@A@BAA@@@@@@@@A@@AB@@@A@@@A@@@@@@@@A@@@@@@@@A@@@@AA@@@@@@@@@@@A@@@@@AA@@@@@@BAA@@@@C@AB@@C@@A@@AK@BE@@@CB@@@@@@A@@@@@@@@AA@@AACA@AFEBEBIAECIEAEEIOCM@CCGAEIQEMIQ"],"encodeOffsets":[[120996,25176]]}}],"UTF8Encoding":true});}));