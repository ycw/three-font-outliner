var r,e={parse:function(r){var t=function(r,t,a,n){var s=e.T,o={cmap:s.cmap,head:s.head,hhea:s.hhea,maxp:s.maxp,hmtx:s.hmtx,name:s.name,"OS/2":s.OS2,post:s.post,loca:s.loca,kern:s.kern,glyf:s.glyf,"CFF ":s.CFF,"SVG ":s.SVG},i={_data:r,_index:t,_offset:a};for(var h in o){var f=e.findTable(r,h,a);if(f){var d=f[0],l=n[d];null==l&&(l=o[h].parseTab(r,d,f[1],i)),i[h]=n[d]=l}}return i},a=e.B,n=new Uint8Array(r),s={};if("ttcf"==a.readASCII(n,0,4)){var o=4;a.readUshort(n,o),o+=2,a.readUshort(n,o),o+=2;var i=a.readUint(n,o);o+=4;for(var h=[],f=0;f<i;f++){var d=a.readUint(n,o);o+=4,h.push(t(n,f,d,s))}return h}return[t(n,0,0,s)]},findTable:function(r,t,a){for(var n=e.B,s=n.readUshort(r,a+4),o=a+12,i=0;i<s;i++){var h=n.readASCII(r,o,4),f=(n.readUint(r,o+4),n.readUint(r,o+8)),d=n.readUint(r,o+12);if(h==t)return[f,d];o+=16}return null},T:{}};e.B={readFixed:function(r,e){return(r[e]<<8|r[e+1])+(r[e+2]<<8|r[e+3])/65540},readF2dot14:function(r,t){return e.B.readShort(r,t)/16384},readInt:function(r,t){var a=e.B.t.uint8;return a[0]=r[t+3],a[1]=r[t+2],a[2]=r[t+1],a[3]=r[t],e.B.t.int32[0]},readInt8:function(r,t){return e.B.t.uint8[0]=r[t],e.B.t.int8[0]},readShort:function(r,t){var a=e.B.t.uint8;return a[1]=r[t],a[0]=r[t+1],e.B.t.int16[0]},readUshort:function(r,e){return r[e]<<8|r[e+1]},writeUshort:function(r,e,t){r[e]=t>>8&255,r[e+1]=255&t},readUshorts:function(r,t,a){for(var n=[],s=0;s<a;s++){var o=e.B.readUshort(r,t+2*s);n.push(o)}return n},readUint:function(r,t){var a=e.B.t.uint8;return a[3]=r[t],a[2]=r[t+1],a[1]=r[t+2],a[0]=r[t+3],e.B.t.uint32[0]},writeUint:function(r,e,t){r[e]=t>>24&255,r[e+1]=t>>16&255,r[e+2]=t>>8&255,r[e+3]=t>>0&255},readUint64:function(r,t){return 4294967296*e.B.readUint(r,t)+e.B.readUint(r,t+4)},readASCII:function(r,e,t){for(var a="",n=0;n<t;n++)a+=String.fromCharCode(r[e+n]);return a},writeASCII:function(r,e,t){for(var a=0;a<t.length;a++)r[e+a]=t.charCodeAt(a)},readUnicode:function(r,e,t){for(var a="",n=0;n<t;n++){var s=r[e++]<<8|r[e++];a+=String.fromCharCode(s)}return a},_tdec:window.TextDecoder?new window.TextDecoder:null,readUTF8:function(r,t,a){var n=e.B._tdec;return n&&0==t&&a==r.length?n.decode(r):e.B.readASCII(r,t,a)},readBytes:function(r,e,t){for(var a=[],n=0;n<t;n++)a.push(r[e+n]);return a},readASCIIArray:function(r,e,t){for(var a=[],n=0;n<t;n++)a.push(String.fromCharCode(r[e+n]));return a},t:(r=new ArrayBuffer(8),{buff:r,int8:new Int8Array(r),uint8:new Uint8Array(r),int16:new Int16Array(r),uint16:new Uint16Array(r),int32:new Int32Array(r),uint32:new Uint32Array(r)})},e.T.CFF={parseTab:function(r,t,a){var n=e.B,s=e.T.CFF;(r=new Uint8Array(r.buffer,t,a))[t=0],r[++t],r[++t],r[++t],t++;var o=[];t=s.readIndex(r,t,o);for(var i=[],h=0;h<o.length-1;h++)i.push(n.readASCII(r,t+o[h],o[h+1]-o[h]));t+=o[o.length-1];var f=[];t=s.readIndex(r,t,f);var d=[];for(h=0;h<f.length-1;h++)d.push(s.readDict(r,t+f[h],t+f[h+1]));t+=f[f.length-1];var l=d[0],u=[];t=s.readIndex(r,t,u);var c=[];for(h=0;h<u.length-1;h++)c.push(n.readASCII(r,t+u[h],u[h+1]-u[h]));if(t+=u[u.length-1],s.readSubrs(r,t,l),l.CharStrings&&(l.CharStrings=s.readBytes(r,l.CharStrings)),l.ROS){t=l.FDArray;var v=[];for(t=s.readIndex(r,t,v),l.FDArray=[],h=0;h<v.length-1;h++){var p=s.readDict(r,t+v[h],t+v[h+1]);s._readFDict(r,p,c),l.FDArray.push(p)}t+=v[v.length-1],t=l.FDSelect,l.FDSelect=[];var g=r[t];if(t++,3!=g)throw g;var m=n.readUshort(r,t);for(t+=2,h=0;h<m+1;h++)l.FDSelect.push(n.readUshort(r,t),r[t+2]),t+=3}return l.charset&&(l.charset=s.readCharset(r,l.charset,l.CharStrings.length)),s._readFDict(r,l,c),l},_readFDict:function(r,t,a){var n,s=e.T.CFF;for(var o in t.Private&&(n=t.Private[1],t.Private=s.readDict(r,n,n+t.Private[0]),t.Private.Subrs&&s.readSubrs(r,n+t.Private.Subrs,t.Private)),t)-1!=["FamilyName","FontName","FullName","Notice","version","Copyright"].indexOf(o)&&(t[o]=a[t[o]-426+35])},readSubrs:function(r,t,a){a.Subrs=e.T.CFF.readBytes(r,t);var n,s=a.Subrs.length+1;n=s<1240?107:s<33900?1131:32768,a.Bias=n},readBytes:function(r,t){var a=[];t=e.T.CFF.readIndex(r,t,a);for(var n=[],s=a.length-1,o=r.byteOffset+t,i=0;i<s;i++){var h=a[i];n.push(new Uint8Array(r.buffer,o+h,a[i+1]-h))}return n},tableSE:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,0,111,112,113,114,0,115,116,117,118,119,120,121,122,0,123,0,124,125,126,127,128,129,130,131,0,132,133,0,134,135,136,137,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,138,0,139,0,0,0,0,140,141,142,143,0,0,0,0,0,144,0,0,0,145,0,0,146,147,148,149,0,0,0,0],glyphByUnicode:function(r,e){for(var t=0;t<r.charset.length;t++)if(r.charset[t]==e)return t;return-1},glyphBySE:function(r,t){return t<0||t>255?-1:e.T.CFF.glyphByUnicode(r,e.T.CFF.tableSE[t])},readCharset:function(r,t,a){var n=e.B,s=[".notdef"],o=r[t];if(t++,0==o)for(var i=0;i<a;i++){var h=n.readUshort(r,t);t+=2,s.push(h)}else{if(1!=o&&2!=o)throw"error: format: "+o;for(;s.length<a;){h=n.readUshort(r,t),t+=2;var f=0;for(1==o?(f=r[t],t++):(f=n.readUshort(r,t),t+=2),i=0;i<=f;i++)s.push(h),h++}}return s},readIndex:function(r,t,a){var n=e.B,s=n.readUshort(r,t)+1,o=r[t+=2];if(t++,1==o)for(var i=0;i<s;i++)a.push(r[t+i]);else if(2==o)for(i=0;i<s;i++)a.push(n.readUshort(r,t+2*i));else if(3==o)for(i=0;i<s;i++)a.push(16777215&n.readUint(r,t+3*i-1));else if(4==o)for(i=0;i<s;i++)a.push(n.readUint(r,t+4*i));else if(1!=s)throw"unsupported offset size: "+o+", count: "+s;return(t+=s*o)-1},getCharString:function(r,t,a){var n=e.B,s=r[t],o=r[t+1],i=(r[t+2],r[t+3],r[t+4],1),h=null,f=null;s<=20&&(h=s,i=1),12==s&&(h=100*s+o,i=2),21<=s&&s<=27&&(h=s,i=1),28==s&&(f=n.readShort(r,t+1),i=3),29<=s&&s<=31&&(h=s,i=1),32<=s&&s<=246&&(f=s-139,i=1),247<=s&&s<=250&&(f=256*(s-247)+o+108,i=2),251<=s&&s<=254&&(f=256*-(s-251)-o-108,i=2),255==s&&(f=n.readInt(r,t+1)/65535,i=5),a.val=null!=f?f:"o"+h,a.size=i},readCharString:function(r,t,a){for(var n=t+a,s=e.B,o=[];t<n;){var i=r[t],h=r[t+1],f=(r[t+2],r[t+3],r[t+4],1),d=null,l=null;i<=20&&(d=i,f=1),12==i&&(d=100*i+h,f=2),19!=i&&20!=i||(d=i,f=2),21<=i&&i<=27&&(d=i,f=1),28==i&&(l=s.readShort(r,t+1),f=3),29<=i&&i<=31&&(d=i,f=1),32<=i&&i<=246&&(l=i-139,f=1),247<=i&&i<=250&&(l=256*(i-247)+h+108,f=2),251<=i&&i<=254&&(l=256*-(i-251)-h-108,f=2),255==i&&(l=s.readInt(r,t+1)/65535,f=5),o.push(null!=l?l:"o"+d),t+=f}return o},readDict:function(r,t,a){for(var n=e.B,s={},o=[];t<a;){var i=r[t],h=r[t+1],f=(r[t+2],r[t+3],r[t+4],1),d=null,l=null;if(28==i&&(l=n.readShort(r,t+1),f=3),29==i&&(l=n.readInt(r,t+1),f=5),32<=i&&i<=246&&(l=i-139,f=1),247<=i&&i<=250&&(l=256*(i-247)+h+108,f=2),251<=i&&i<=254&&(l=256*-(i-251)-h-108,f=2),255==i)throw l=n.readInt(r,t+1)/65535,f=5,"unknown number";if(30==i){var u=[];for(f=1;;){var c=r[t+f];f++;var v=c>>4,p=15&c;if(15!=v&&u.push(v),15!=p&&u.push(p),15==p)break}for(var g="",m=[0,1,2,3,4,5,6,7,8,9,".","e","e-","reserved","-","endOfNumber"],y=0;y<u.length;y++)g+=m[u[y]];l=parseFloat(g)}i<=21&&(d=["version","Notice","FullName","FamilyName","Weight","FontBBox","BlueValues","OtherBlues","FamilyBlues","FamilyOtherBlues","StdHW","StdVW","escape","UniqueID","XUID","charset","Encoding","CharStrings","Private","Subrs","defaultWidthX","nominalWidthX"][i],f=1,12==i&&(d=["Copyright","isFixedPitch","ItalicAngle","UnderlinePosition","UnderlineThickness","PaintType","CharstringType","FontMatrix","StrokeWidth","BlueScale","BlueShift","BlueFuzz","StemSnapH","StemSnapV","ForceBold","","","LanguageGroup","ExpansionFactor","initialRandomSeed","SyntheticBase","PostScript","BaseFontName","BaseFontBlend","","","","","","","ROS","CIDFontVersion","CIDFontRevision","CIDFontType","CIDCount","UIDBase","FDArray","FDSelect","FontName"][h],f=2)),null!=d?(s[d]=1==o.length?o[0]:o,o=[]):o.push(l),t+=f}return s}},e.T.cmap={parseTab:function(r,t,a){var n={tables:[],ids:{},off:t};r=new Uint8Array(r.buffer,t,a),t=0;var s=e.B,o=s.readUshort,i=e.T.cmap,h=(o(r,t),o(r,t+=2));t+=2;for(var f=[],d=0;d<h;d++){var l=o(r,t),u=o(r,t+=2);t+=2;var c=s.readUint(r,t);t+=4;var v="p"+l+"e"+u,p=f.indexOf(c);if(-1==p){p=n.tables.length;var g={};f.push(c);var m=g.format=o(r,c);0==m?g=i.parse0(r,c,g):4==m?g=i.parse4(r,c,g):6==m?g=i.parse6(r,c,g):12==m&&(g=i.parse12(r,c,g)),n.tables.push(g)}if(null!=n.ids[v])throw"multiple tables for one platform+encoding";n.ids[v]=p}return n},parse0:function(r,t,a){var n=e.B;t+=2;var s=n.readUshort(r,t);t+=2,n.readUshort(r,t),t+=2,a.map=[];for(var o=0;o<s-6;o++)a.map.push(r[t+o]);return a},parse4:function(r,t,a){var n=e.B,s=n.readUshort,o=n.readUshorts,i=t,h=s(r,t+=2),f=(s(r,t+=2),s(r,t+=2));t+=2;var d=f>>>1;a.searchRange=s(r,t),t+=2,a.entrySelector=s(r,t),t+=2,a.rangeShift=s(r,t),t+=2,a.endCount=o(r,t,d),t+=2*d,t+=2,a.startCount=o(r,t,d),t+=2*d,a.idDelta=[];for(var l=0;l<d;l++)a.idDelta.push(n.readShort(r,t)),t+=2;return a.idRangeOffset=o(r,t,d),t+=2*d,a.glyphIdArray=o(r,t,i+h-t>>>1),a},parse6:function(r,t,a){var n=e.B;t+=2,n.readUshort(r,t),t+=2,n.readUshort(r,t),t+=2,a.firstCode=n.readUshort(r,t),t+=2;var s=n.readUshort(r,t);t+=2,a.glyphIdArray=[];for(var o=0;o<s;o++)a.glyphIdArray.push(n.readUshort(r,t)),t+=2;return a},parse12:function(r,t,a){var n=e.B.readUint,s=(n(r,t+=4),n(r,t+=4),3*n(r,t+=4));t+=4;for(var o=a.groups=new Uint32Array(s),i=0;i<s;i+=3)o[i]=n(r,t+(i<<2)),o[i+1]=n(r,t+(i<<2)+4),o[i+2]=n(r,t+(i<<2)+8);return a}},e.T.glyf={parseTab:function(r,e,t,a){for(var n=[],s=a.maxp.numGlyphs,o=0;o<s;o++)n.push(null);return n},_parseGlyf:function(r,t){var a=e.B,n=r._data,s=r.loca;if(s[t]==s[t+1])return null;var o=e.findTable(n,"glyf",r._offset)[0]+s[t],i={};if(i.noc=a.readShort(n,o),o+=2,i.xMin=a.readShort(n,o),o+=2,i.yMin=a.readShort(n,o),o+=2,i.xMax=a.readShort(n,o),o+=2,i.yMax=a.readShort(n,o),o+=2,i.xMin>=i.xMax||i.yMin>=i.yMax)return null;if(i.noc>0){i.endPts=[];for(var h=0;h<i.noc;h++)i.endPts.push(a.readUshort(n,o)),o+=2;var f=a.readUshort(n,o);if(o+=2,n.length-o<f)return null;i.instructions=a.readBytes(n,o,f),o+=f;var d=i.endPts[i.noc-1]+1;for(i.flags=[],h=0;h<d;h++){var l=n[o];if(o++,i.flags.push(l),0!=(8&l)){var u=n[o];o++;for(var c=0;c<u;c++)i.flags.push(l),h++}}for(i.xs=[],h=0;h<d;h++){var v=0!=(2&i.flags[h]),p=0!=(16&i.flags[h]);v?(i.xs.push(p?n[o]:-n[o]),o++):p?i.xs.push(0):(i.xs.push(a.readShort(n,o)),o+=2)}for(i.ys=[],h=0;h<d;h++)v=0!=(4&i.flags[h]),p=0!=(32&i.flags[h]),v?(i.ys.push(p?n[o]:-n[o]),o++):p?i.ys.push(0):(i.ys.push(a.readShort(n,o)),o+=2);var g=0,m=0;for(h=0;h<d;h++)g+=i.xs[h],m+=i.ys[h],i.xs[h]=g,i.ys[h]=m}else{var y;i.parts=[];do{y=a.readUshort(n,o),o+=2;var S={m:{a:1,b:0,c:0,d:1,tx:0,ty:0},p1:-1,p2:-1};if(i.parts.push(S),S.glyphIndex=a.readUshort(n,o),o+=2,1&y){var U=a.readShort(n,o);o+=2;var C=a.readShort(n,o);o+=2}else U=a.readInt8(n,o),o++,C=a.readInt8(n,o),o++;2&y?(S.m.tx=U,S.m.ty=C):(S.p1=U,S.p2=C),8&y?(S.m.a=S.m.d=a.readF2dot14(n,o),o+=2):64&y?(S.m.a=a.readF2dot14(n,o),o+=2,S.m.d=a.readF2dot14(n,o),o+=2):128&y&&(S.m.a=a.readF2dot14(n,o),o+=2,S.m.b=a.readF2dot14(n,o),o+=2,S.m.c=a.readF2dot14(n,o),o+=2,S.m.d=a.readF2dot14(n,o),o+=2)}while(32&y);if(256&y){var T=a.readUshort(n,o);for(o+=2,i.instr=[],h=0;h<T;h++)i.instr.push(n[o]),o++}}return i}},e.T.head={parseTab:function(r,t,a){var n=e.B,s={};return n.readFixed(r,t),t+=4,s.fontRevision=n.readFixed(r,t),t+=4,n.readUint(r,t),t+=4,n.readUint(r,t),t+=4,s.flags=n.readUshort(r,t),t+=2,s.unitsPerEm=n.readUshort(r,t),t+=2,s.created=n.readUint64(r,t),t+=8,s.modified=n.readUint64(r,t),t+=8,s.xMin=n.readShort(r,t),t+=2,s.yMin=n.readShort(r,t),t+=2,s.xMax=n.readShort(r,t),t+=2,s.yMax=n.readShort(r,t),t+=2,s.macStyle=n.readUshort(r,t),t+=2,s.lowestRecPPEM=n.readUshort(r,t),t+=2,s.fontDirectionHint=n.readShort(r,t),t+=2,s.indexToLocFormat=n.readShort(r,t),t+=2,s.glyphDataFormat=n.readShort(r,t),t+=2,s}},e.T.hhea={parseTab:function(r,t,a){var n=e.B,s={};n.readFixed(r,t),t+=4;for(var o=["ascender","descender","lineGap","advanceWidthMax","minLeftSideBearing","minRightSideBearing","xMaxExtent","caretSlopeRise","caretSlopeRun","caretOffset","res0","res1","res2","res3","metricDataFormat","numberOfHMetrics"],i=0;i<o.length;i++){var h=o[i],f="advanceWidthMax"==h||"numberOfHMetrics"==h?n.readUshort:n.readShort;s[h]=f(r,t+2*i)}return s}},e.T.hmtx={parseTab:function(r,t,a,n){for(var s=e.B,o=[],i=[],h=n.maxp.numGlyphs,f=n.hhea.numberOfHMetrics,d=0,l=0,u=0;u<f;)d=s.readUshort(r,t+(u<<2)),l=s.readShort(r,t+(u<<2)+2),o.push(d),i.push(l),u++;for(;u<h;)o.push(d),i.push(l),u++;return{aWidth:o,lsBearing:i}}},e.T.kern={parseTab:function(r,t,a,n){var s=e.B,o=e.T.kern;if(1==s.readUshort(r,t))return o.parseV1(r,t,a,n);var i=s.readUshort(r,t+2);t+=4;for(var h={glyph1:[],rval:[]},f=0;f<i;f++){t+=2,a=s.readUshort(r,t),t+=2;var d=s.readUshort(r,t);t+=2;var l=d>>>8;0==(l&=15)&&(t=o.readFormat0(r,t,h))}return h},parseV1:function(r,t,a,n){var s=e.B,o=e.T.kern,i=(s.readFixed(r,t),s.readUint(r,t+4));t+=8;for(var h={glyph1:[],rval:[]},f=0;f<i;f++){s.readUint(r,t),t+=4;var d=s.readUshort(r,t);t+=2,s.readUshort(r,t),t+=2,0==(255&d)&&(t=o.readFormat0(r,t,h))}return h},readFormat0:function(r,t,a){var n=e.B,s=n.readUshort,o=-1,i=s(r,t);s(r,t+2),s(r,t+4),s(r,t+6),t+=8;for(var h=0;h<i;h++){var f=s(r,t),d=s(r,t+=2);t+=2;var l=n.readShort(r,t);t+=2,f!=o&&(a.glyph1.push(f),a.rval.push({glyph2:[],vals:[]}));var u=a.rval[a.rval.length-1];u.glyph2.push(d),u.vals.push(l),o=f}return t}},e.T.loca={parseTab:function(r,t,a,n){var s=e.B,o=[],i=n.head.indexToLocFormat,h=n.maxp.numGlyphs+1;if(0==i)for(var f=0;f<h;f++)o.push(s.readUshort(r,t+(f<<1))<<1);if(1==i)for(f=0;f<h;f++)o.push(s.readUint(r,t+(f<<2)));return o}},e.T.maxp={parseTab:function(r,t,a){var n=e.B,s=n.readUshort,o={};return n.readUint(r,t),t+=4,o.numGlyphs=s(r,t),t+=2,o}},e.T.name={parseTab:function(r,t,a){var n=e.B,s={};n.readUshort(r,t),t+=2;var o=n.readUshort(r,t);t+=2,n.readUshort(r,t);for(var i=["copyright","fontFamily","fontSubfamily","ID","fullName","version","postScriptName","trademark","manufacturer","designer","description","urlVendor","urlDesigner","licence","licenceURL","---","typoFamilyName","typoSubfamilyName","compatibleFull","sampleText","postScriptCID","wwsFamilyName","wwsSubfamilyName","lightPalette","darkPalette"],h=t+=2,f=n.readUshort,d=0;d<o;d++){var l=f(r,t),u=f(r,t+=2),c=f(r,t+=2),v=f(r,t+=2),p=f(r,t+=2),g=f(r,t+=2);t+=2;var m,y=h+12*o+g;0==l||3==l&&0==u?m=n.readUnicode(r,y,p/2):0==u?m=n.readASCII(r,y,p):1==u||3==u||4==u||10==u?m=n.readUnicode(r,y,p/2):1==l?(m=n.readASCII(r,y,p),console.log("reading unknown MAC encoding "+u+" as ASCII")):(console.log("unknown encoding "+u+", platformID: "+l),m=n.readASCII(r,y,p));var S="p"+l+","+c.toString(16);null==s[S]&&(s[S]={}),s[S][i[v]]=m,s[S]._lang=c}var U,C="postScriptName";for(var T in s)if(null!=s[T][C]&&1033==s[T]._lang)return s[T];for(var T in s)if(null!=s[T][C]&&0==s[T]._lang)return s[T];for(var T in s)if(null!=s[T][C]&&3084==s[T]._lang)return s[T];for(var T in s)if(null!=s[T][C])return s[T];for(var T in s){U=s[T];break}return console.log("returning name table with languageID "+U._lang),null==U[C]&&null!=U.ID&&(U[C]=U.ID),U}},e.T.OS2={parseTab:function(r,t,a){var n=e.B.readUshort(r,t);t+=2;var s=e.T.OS2,o={};if(0==n)s.version0(r,t,o);else if(1==n)s.version1(r,t,o);else if(2==n||3==n||4==n)s.version2(r,t,o);else{if(5!=n)throw"unknown OS/2 table version: "+n;s.version5(r,t,o)}return o},version0:function(r,t,a){var n=e.B;return a.xAvgCharWidth=n.readShort(r,t),t+=2,a.usWeightClass=n.readUshort(r,t),t+=2,a.usWidthClass=n.readUshort(r,t),t+=2,a.fsType=n.readUshort(r,t),t+=2,a.ySubscriptXSize=n.readShort(r,t),t+=2,a.ySubscriptYSize=n.readShort(r,t),t+=2,a.ySubscriptXOffset=n.readShort(r,t),t+=2,a.ySubscriptYOffset=n.readShort(r,t),t+=2,a.ySuperscriptXSize=n.readShort(r,t),t+=2,a.ySuperscriptYSize=n.readShort(r,t),t+=2,a.ySuperscriptXOffset=n.readShort(r,t),t+=2,a.ySuperscriptYOffset=n.readShort(r,t),t+=2,a.yStrikeoutSize=n.readShort(r,t),t+=2,a.yStrikeoutPosition=n.readShort(r,t),t+=2,a.sFamilyClass=n.readShort(r,t),t+=2,a.panose=n.readBytes(r,t,10),t+=10,a.ulUnicodeRange1=n.readUint(r,t),t+=4,a.ulUnicodeRange2=n.readUint(r,t),t+=4,a.ulUnicodeRange3=n.readUint(r,t),t+=4,a.ulUnicodeRange4=n.readUint(r,t),t+=4,a.achVendID=n.readASCII(r,t,4),t+=4,a.fsSelection=n.readUshort(r,t),t+=2,a.usFirstCharIndex=n.readUshort(r,t),t+=2,a.usLastCharIndex=n.readUshort(r,t),t+=2,a.sTypoAscender=n.readShort(r,t),t+=2,a.sTypoDescender=n.readShort(r,t),t+=2,a.sTypoLineGap=n.readShort(r,t),t+=2,a.usWinAscent=n.readUshort(r,t),t+=2,a.usWinDescent=n.readUshort(r,t),t+2},version1:function(r,t,a){var n=e.B;return t=e.T.OS2.version0(r,t,a),a.ulCodePageRange1=n.readUint(r,t),t+=4,a.ulCodePageRange2=n.readUint(r,t),t+4},version2:function(r,t,a){var n=e.B,s=n.readUshort;return t=e.T.OS2.version1(r,t,a),a.sxHeight=n.readShort(r,t),t+=2,a.sCapHeight=n.readShort(r,t),t+=2,a.usDefault=s(r,t),t+=2,a.usBreak=s(r,t),t+=2,a.usMaxContext=s(r,t),t+2},version5:function(r,t,a){var n=e.B.readUshort;return t=e.T.OS2.version2(r,t,a),a.usLowerOpticalPointSize=n(r,t),t+=2,a.usUpperOpticalPointSize=n(r,t),t+2}},e.T.post={parseTab:function(r,t,a){var n=e.B,s={};return s.version=n.readFixed(r,t),t+=4,s.italicAngle=n.readFixed(r,t),t+=4,s.underlinePosition=n.readShort(r,t),t+=2,s.underlineThickness=n.readShort(r,t),t+=2,s}},e.T.SVG={parseTab:function(r,t,a){var n=e.B,s={entries:[]},o=t;n.readUshort(r,t),t+=2;var i=n.readUint(r,t);t+=4,n.readUint(r,t),t+=4,t=i+o;var h=n.readUshort(r,t);t+=2;for(var f=0;f<h;f++){var d=n.readUshort(r,t);t+=2;var l=n.readUshort(r,t);t+=2;var u=n.readUint(r,t);t+=4;var c=n.readUint(r,t);t+=4;for(var v=new Uint8Array(r.buffer,o+u+i,c),p=n.readUTF8(v,0,v.length),g=d;g<=l;g++)s.entries[g]=p}return s}},e.U={shape:function(r,t,a){for(var n=function(r,e,t,a){var n=e[t],s=e[t+1],o=r.kern;if(o){var i=o.glyph1.indexOf(n);if(-1!=i){var h=o.rval[i].glyph2.indexOf(s);if(-1!=h)return[0,0,o.rval[i].vals[h],0]}}return[0,0,0,0]},s=[],o=0;o<t.length;o++){var i=t.codePointAt(o);i>65535&&o++,s.push(e.U.codeToGlyph(r,i))}var h=[];for(o=0;o<s.length;o++){var f=n(r,s,o),d=s[o],l=r.hmtx.aWidth[d]+f[2];h.push({g:d,cl:o,dx:0,dy:0,ax:l,ay:0})}return h},shapeToPath:function(r,t,a){for(var n={cmds:[],crds:[]},s=0,o=0,i=0;i<t.length;i++){for(var h=t[i],f=e.U.glyphToPath(r,h.g),d=f.crds,l=0;l<d.length;l+=2)n.crds.push(d[l]+s+h.dx),n.crds.push(d[l+1]+o+h.dy);for(a&&n.cmds.push(a),l=0;l<f.cmds.length;l++)n.cmds.push(f.cmds[l]);var u=n.cmds.length;a&&0!=u&&"X"!=n.cmds[u-1]&&n.cmds.push("X"),s+=h.ax,o+=h.ay}return{cmds:n.cmds,crds:n.crds}},codeToGlyph:function(r,e){for(var t=r.cmap,a=-1,n=["p3e10","p0e4","p3e1","p1e0","p0e3","p0e1"],s=0;s<n.length;s++)if(null!=t.ids[n[s]]){a=t.ids[n[s]];break}if(-1==a)throw"no familiar platform and encoding!";var o=function(r,e,t){for(var a=0,n=Math.floor(r.length/e);a+1!=n;){var s=a+(n-a>>>1);r[s*e]<=t?a=s:n=s}return a*e},i=t.tables[a],h=i.format,f=-1;if(0==h)f=e>=i.map.length?0:i.map[e];else if(4==h){var d=-1,l=i.endCount;e>l[l.length-1]?d=-1:l[d=o(l,1,e)]<e&&d++,f=-1==d||e<i.startCount[d]?0:65535&(0!=i.idRangeOffset[d]?i.glyphIdArray[e-i.startCount[d]+(i.idRangeOffset[d]>>1)-(i.idRangeOffset.length-d)]:e+i.idDelta[d])}else if(6==h){var u=e-i.firstCode,c=i.glyphIdArray;f=u<0||u>=c.length?0:c[u]}else{if(12!=h)throw"unknown cmap table format "+i.format;var v=i.groups;e>v[v.length-2]?f=0:(v[s=o(v,3,e)]<=e&&e<=v[s+1]&&(f=v[s+2]+(e-v[s])),-1==f&&(f=0))}var p=r["SVG "],g=r.loca;return 0==f||null!=r["CFF "]||null!=p&&null!=p.entries[f]||g[f]!=g[f+1]||-1!=[9,10,11,12,13,32,133,160,5760,8232,8233,8239,12288,6158,8203,8204,8205,8288,65279].indexOf(e)||8192<=e&&e<=8202||(f=0),f},glyphToPath:function(r,t){var a={cmds:[],crds:[]},n=r["SVG "],s=r["CFF "],o=e.U;if(n&&n.entries[t]){var i=n.entries[t];null!=i&&("string"==typeof i&&(i=o.SVG.toPath(i),n.entries[t]=i),a=i)}else if(s){var h=s.Private,f={x:0,y:0,stack:[],nStems:0,haveWidth:!1,width:h?h.defaultWidthX:0,open:!1};if(s.ROS){for(var d=0;s.FDSelect[d+2]<=t;)d+=2;h=s.FDArray[s.FDSelect[d+1]].Private}o._drawCFF(s.CharStrings[t],f,s,h,a)}else r.glyf&&o._drawGlyf(t,r,a);return{cmds:a.cmds,crds:a.crds}},_drawGlyf:function(r,t,a){var n=t.glyf[r];null==n&&(n=t.glyf[r]=e.T.glyf._parseGlyf(t,r)),null!=n&&(n.noc>-1?e.U._simpleGlyph(n,a):e.U._compoGlyph(n,t,a))},_simpleGlyph:function(r,t){for(var a=e.U.P,n=0;n<r.noc;n++){for(var s=0==n?0:r.endPts[n-1]+1,o=r.endPts[n],i=s;i<=o;i++){var h=i==s?o:i-1,f=i==o?s:i+1,d=1&r.flags[i],l=1&r.flags[h],u=1&r.flags[f],c=r.xs[i],v=r.ys[i];if(i==s)if(d){if(!l){a.MoveTo(t,c,v);continue}a.MoveTo(t,r.xs[h],r.ys[h])}else l?a.MoveTo(t,r.xs[h],r.ys[h]):a.MoveTo(t,Math.floor(.5*(r.xs[h]+c)),Math.floor(.5*(r.ys[h]+v)));d?l&&a.LineTo(t,c,v):u?a.qCurveTo(t,c,v,r.xs[f],r.ys[f]):a.qCurveTo(t,c,v,Math.floor(.5*(c+r.xs[f])),Math.floor(.5*(v+r.ys[f])))}a.ClosePath(t)}},_compoGlyph:function(r,t,a){for(var n=0;n<r.parts.length;n++){var s={cmds:[],crds:[]},o=r.parts[n];e.U._drawGlyf(o.glyphIndex,t,s);for(var i=o.m,h=0;h<s.crds.length;h+=2){var f=s.crds[h],d=s.crds[h+1];a.crds.push(f*i.a+d*i.b+i.tx),a.crds.push(f*i.c+d*i.d+i.ty)}for(h=0;h<s.cmds.length;h++)a.cmds.push(s.cmds[h])}},pathToSVG:function(r,e){var t=r.cmds,a=r.crds;null==e&&(e=5);for(var n=[],s=0,o={M:2,L:2,Q:4,C:6},i=0;i<t.length;i++){var h=t[i],f=s+(o[h]?o[h]:0);for(n.push(h);s<f;){var d=a[s++];n.push(parseFloat(d.toFixed(e))+(s==f?"":" "))}}return n.join("")},SVGToPath:function(r){var t={cmds:[],crds:[]};return e.U.SVG.svgToPath(r,t),{cmds:t.cmds,crds:t.crds}},pathToContext:function(r,e){for(var t=0,a=r.cmds,n=r.crds,s=0;s<a.length;s++){var o=a[s];"M"==o?(e.moveTo(n[t],n[t+1]),t+=2):"L"==o?(e.lineTo(n[t],n[t+1]),t+=2):"C"==o?(e.bezierCurveTo(n[t],n[t+1],n[t+2],n[t+3],n[t+4],n[t+5]),t+=6):"Q"==o?(e.quadraticCurveTo(n[t],n[t+1],n[t+2],n[t+3]),t+=4):"#"==o.charAt(0)?(e.beginPath(),e.fillStyle=o):"Z"==o?e.closePath():"X"==o&&e.fill()}},P:{MoveTo:function(r,e,t){r.cmds.push("M"),r.crds.push(e,t)},LineTo:function(r,e,t){r.cmds.push("L"),r.crds.push(e,t)},CurveTo:function(r,e,t,a,n,s,o){r.cmds.push("C"),r.crds.push(e,t,a,n,s,o)},qCurveTo:function(r,e,t,a,n){r.cmds.push("Q"),r.crds.push(e,t,a,n)},ClosePath:function(r){r.cmds.push("Z")}},_drawCFF:function(r,t,a,n,s){for(var o=t.stack,i=t.nStems,h=t.haveWidth,f=t.width,d=t.open,l=0,u=t.x,c=t.y,v=0,p=0,g=0,m=0,y=0,S=0,U=0,C=0,T=0,b=0,x=e.T.CFF,F=e.U.P,B=n.nominalWidthX,M={val:0,size:0};l<r.length;){x.getCharString(r,l,M);var w=M.val;if(l+=M.size,"o1"==w||"o18"==w)o.length%2!=0&&!h&&(f=o.shift()+B),i+=o.length>>1,o.length=0,h=!0;else if("o3"==w||"o23"==w)o.length%2!=0&&!h&&(f=o.shift()+B),i+=o.length>>1,o.length=0,h=!0;else if("o4"==w)o.length>1&&!h&&(f=o.shift()+B,h=!0),d&&F.ClosePath(s),c+=o.pop(),F.MoveTo(s,u,c),d=!0;else if("o5"==w)for(;o.length>0;)u+=o.shift(),c+=o.shift(),F.LineTo(s,u,c);else if("o6"==w||"o7"==w)for(var _=o.length,I="o6"==w,A=0;A<_;A++){var P=o.shift();I?u+=P:c+=P,I=!I,F.LineTo(s,u,c)}else if("o8"==w||"o24"==w){_=o.length;for(var D=0;D+6<=_;)v=u+o.shift(),p=c+o.shift(),g=v+o.shift(),m=p+o.shift(),u=g+o.shift(),c=m+o.shift(),F.CurveTo(s,v,p,g,m,u,c),D+=6;"o24"==w&&(u+=o.shift(),c+=o.shift(),F.LineTo(s,u,c))}else{if("o11"==w)break;if("o1234"==w||"o1235"==w||"o1236"==w||"o1237"==w)"o1234"==w&&(p=c,g=(v=u+o.shift())+o.shift(),b=m=p+o.shift(),S=m,C=c,u=(U=(y=(T=g+o.shift())+o.shift())+o.shift())+o.shift(),F.CurveTo(s,v,p,g,m,T,b),F.CurveTo(s,y,S,U,C,u,c)),"o1235"==w&&(v=u+o.shift(),p=c+o.shift(),g=v+o.shift(),m=p+o.shift(),T=g+o.shift(),b=m+o.shift(),y=T+o.shift(),S=b+o.shift(),U=y+o.shift(),C=S+o.shift(),u=U+o.shift(),c=C+o.shift(),o.shift(),F.CurveTo(s,v,p,g,m,T,b),F.CurveTo(s,y,S,U,C,u,c)),"o1236"==w&&(v=u+o.shift(),p=c+o.shift(),g=v+o.shift(),b=m=p+o.shift(),S=m,U=(y=(T=g+o.shift())+o.shift())+o.shift(),C=S+o.shift(),u=U+o.shift(),F.CurveTo(s,v,p,g,m,T,b),F.CurveTo(s,y,S,U,C,u,c)),"o1237"==w&&(v=u+o.shift(),p=c+o.shift(),g=v+o.shift(),m=p+o.shift(),T=g+o.shift(),b=m+o.shift(),y=T+o.shift(),S=b+o.shift(),U=y+o.shift(),C=S+o.shift(),Math.abs(U-u)>Math.abs(C-c)?u=U+o.shift():c=C+o.shift(),F.CurveTo(s,v,p,g,m,T,b),F.CurveTo(s,y,S,U,C,u,c));else if("o14"==w){if(o.length>0&&!h&&(f=o.shift()+a.nominalWidthX,h=!0),4==o.length){var O=o.shift(),k=o.shift(),G=o.shift(),L=o.shift(),W=x.glyphBySE(a,G),R=x.glyphBySE(a,L);e.U._drawCFF(a.CharStrings[W],t,a,n,s),t.x=O,t.y=k,e.U._drawCFF(a.CharStrings[R],t,a,n,s)}d&&(F.ClosePath(s),d=!1)}else if("o19"==w||"o20"==w)o.length%2!=0&&!h&&(f=o.shift()+B),i+=o.length>>1,o.length=0,h=!0,l+=i+7>>3;else if("o21"==w)o.length>2&&!h&&(f=o.shift()+B,h=!0),c+=o.pop(),u+=o.pop(),d&&F.ClosePath(s),F.MoveTo(s,u,c),d=!0;else if("o22"==w)o.length>1&&!h&&(f=o.shift()+B,h=!0),u+=o.pop(),d&&F.ClosePath(s),F.MoveTo(s,u,c),d=!0;else if("o25"==w){for(;o.length>6;)u+=o.shift(),c+=o.shift(),F.LineTo(s,u,c);v=u+o.shift(),p=c+o.shift(),g=v+o.shift(),m=p+o.shift(),u=g+o.shift(),c=m+o.shift(),F.CurveTo(s,v,p,g,m,u,c)}else if("o26"==w)for(o.length%2&&(u+=o.shift());o.length>0;)v=u,p=c+o.shift(),u=g=v+o.shift(),c=(m=p+o.shift())+o.shift(),F.CurveTo(s,v,p,g,m,u,c);else if("o27"==w)for(o.length%2&&(c+=o.shift());o.length>0;)p=c,g=(v=u+o.shift())+o.shift(),m=p+o.shift(),u=g+o.shift(),c=m,F.CurveTo(s,v,p,g,m,u,c);else if("o10"==w||"o29"==w){var V="o10"==w?n:a;if(0==o.length)console.log("error: empty stack");else{var N=o.pop(),z=V.Subrs[N+V.Bias];t.x=u,t.y=c,t.nStems=i,t.haveWidth=h,t.width=f,t.open=d,e.U._drawCFF(z,t,a,n,s),u=t.x,c=t.y,i=t.nStems,h=t.haveWidth,f=t.width,d=t.open}}else if("o30"==w||"o31"==w){var E=o.length,X=(D=0,"o31"==w);for(D+=E-(_=-3&E);D<_;)X?(p=c,g=(v=u+o.shift())+o.shift(),c=(m=p+o.shift())+o.shift(),_-D==5?(u=g+o.shift(),D++):u=g,X=!1):(v=u,p=c+o.shift(),g=v+o.shift(),m=p+o.shift(),u=g+o.shift(),_-D==5?(c=m+o.shift(),D++):c=m,X=!0),F.CurveTo(s,v,p,g,m,u,c),D+=4}else{if("o"==(w+"").charAt(0))throw console.log("Unknown operation: "+w,r),w;o.push(w)}}}t.x=u,t.y=c,t.nStems=i,t.haveWidth=h,t.width=f,t.open=d},SVG:function(){var r={getScale:function(r){return Math.sqrt(Math.abs(r[0]*r[3]-r[1]*r[2]))},translate:function(e,t,a){r.concat(e,[1,0,0,1,t,a])},rotate:function(e,t){r.concat(e,[Math.cos(t),-Math.sin(t),Math.sin(t),Math.cos(t),0,0])},scale:function(e,t,a){r.concat(e,[t,0,0,a,0,0])},concat:function(r,e){var t=r[0],a=r[1],n=r[2],s=r[3],o=r[4],i=r[5];r[0]=t*e[0]+a*e[2],r[1]=t*e[1]+a*e[3],r[2]=n*e[0]+s*e[2],r[3]=n*e[1]+s*e[3],r[4]=o*e[0]+i*e[2]+e[4],r[5]=o*e[1]+i*e[3]+e[5]},invert:function(r){var e=r[0],t=r[1],a=r[2],n=r[3],s=r[4],o=r[5],i=e*n-t*a;r[0]=n/i,r[1]=-t/i,r[2]=-a/i,r[3]=e/i,r[4]=(a*o-n*s)/i,r[5]=(t*s-e*o)/i},multPoint:function(r,e){var t=e[0],a=e[1];return[t*r[0]+a*r[2]+r[4],t*r[1]+a*r[3]+r[5]]},multArray:function(r,e){for(var t=0;t<e.length;t+=2){var a=e[t],n=e[t+1];e[t]=a*r[0]+n*r[2]+r[4],e[t+1]=a*r[1]+n*r[3]+r[5]}}};function e(r,e,t){for(var a=[],n=0,s=0,o=0;;){var i=r.indexOf(e,s),h=r.indexOf(t,s);if(-1==i&&-1==h)break;-1==h||-1!=i&&i<h?(0==o&&(a.push(r.slice(n,i).trim()),n=i+1),o++,s=i+1):(-1==i||-1!=h&&h<i)&&(0==--o&&(a.push(r.slice(n,h).trim()),n=h+1),s=h+1)}return a}function t(t){for(var n=e(t,"(",")"),s=[1,0,0,1,0,0],o=0;o<n.length;o+=2){var i=s;s=a(n[o],n[o+1]),r.concat(s,i)}return s}function a(e,t){for(var a=[1,0,0,1,0,0],n=!0,s=0;s<t.length;s++){var o=t.charAt(s);","==o||" "==o?n=!0:"."==o?(n||(t=t.slice(0,s)+","+t.slice(s),s++),n=!1):"-"==o&&s>0&&"e"!=t[s-1]&&(t=t.slice(0,s)+" "+t.slice(s),s++,n=!0)}if(t=t.split(/\s*[\s,]\s*/).map(parseFloat),"translate"==e)1==t.length?r.translate(a,t[0],0):r.translate(a,t[0],t[1]);else if("scale"==e)1==t.length?r.scale(a,t[0],t[0]):r.scale(a,t[0],t[1]);else if("rotate"==e){var i=0,h=0;1!=t.length&&(i=t[1],h=t[2]),r.translate(a,-i,-h),r.rotate(a,-Math.PI*t[0]/180),r.translate(a,i,h)}else"matrix"==e?a=t:console.log("unknown transform: ",e);return a}function n(r,e,t){for(var a=e;a<r.length&&"string"!=typeof r[a];)a+=t;return(a-e)/t}function s(r,e){for(var t=function(r){for(var e=[],t=0,a=!1,n="",s="";t<r.length;){var o=r.charCodeAt(t),i=r.charAt(t);t++;var h=48<=o&&o<=57||"."==i||"-"==i||"e"==i||"E"==i;a?"-"==i&&"e"!=s||"."==i&&-1!=n.indexOf(".")?(e.push(parseFloat(n)),n=i):h?n+=i:(e.push(parseFloat(n)),","!=i&&" "!=i&&e.push(i),a=!1):h?(n=i,a=!0):","!=i&&" "!=i&&e.push(i),s=i}return a&&e.push(parseFloat(n)),e}(r),a=0,s=0,o=0,i=0,h=0,f=e.crds.length,d={M:2,L:2,H:1,V:1,T:2,S:4,A:7,Q:4,C:6},l=e.cmds,u=e.crds;a<t.length;){var c=t[a];a++;var v=c.toUpperCase();if("Z"==v)l.push("Z"),s=i,o=h;else for(var p=n(t,a,d[v]),g=0;g<p;g++){1==g&&"M"==v&&(c=c==v?"L":"l",v="L");var m=0,y=0;if(c!=v&&(m=s,y=o),"M"==v)s=m+t[a++],o=y+t[a++],l.push("M"),u.push(s,o),i=s,h=o;else if("L"==v)s=m+t[a++],o=y+t[a++],l.push("L"),u.push(s,o);else if("H"==v)s=m+t[a++],l.push("L"),u.push(s,o);else if("V"==v)o=y+t[a++],l.push("L"),u.push(s,o);else if("Q"==v){var S=m+t[a++],U=y+t[a++],C=m+t[a++],T=y+t[a++];l.push("Q"),u.push(S,U,C,T),s=C,o=T}else if("T"==v)S=s+s-u[F=Math.max(u.length-2,f)],U=o+o-u[F+1],C=m+t[a++],T=y+t[a++],l.push("Q"),u.push(S,U,C,T),s=C,o=T;else if("C"==v){S=m+t[a++],U=y+t[a++],C=m+t[a++],T=y+t[a++];var b=m+t[a++],x=y+t[a++];l.push("C"),u.push(S,U,C,T,b,x),s=b,o=x}else if("S"==v){var F;S=s+s-u[F=Math.max(u.length-("C"==l[l.length-1]?4:2),f)],U=o+o-u[F+1],C=m+t[a++],T=y+t[a++],b=m+t[a++],x=y+t[a++],l.push("C"),u.push(S,U,C,T,b,x),s=b,o=x}else if("A"==v){S=s,U=o;var B=t[a++],M=t[a++],w=t[a++]*(Math.PI/180),_=t[a++],I=t[a++];if(C=m+t[a++],T=y+t[a++],C==s&&T==o&&0==B&&0==M)continue;var A=(S-C)/2,P=(U-T)/2,D=Math.cos(w),O=Math.sin(w),k=D*A+O*P,G=-O*A+D*P,L=B*B,W=M*M,R=k*k,V=G*G,N=(L*W-L*V-W*R)/(L*V+W*R),z=(_!=I?1:-1)*Math.sqrt(Math.max(N,0)),E=z*(B*G)/M,X=M*k*-z/B,H=D*E-O*X+(S+C)/2,q=O*E+D*X+(U+T)/2,Q=function(r,e,t,a){var n=(r*t+e*a)/(Math.sqrt(r*r+e*e)*Math.sqrt(t*t+a*a));return(r*a-e*t>=0?1:-1)*Math.acos(Math.max(-1,Math.min(1,n)))},Y=(k-E)/B,Z=(G-X)/M,j=Q(1,0,Y,Z),J=Q(Y,Z,(-k-E)/B,(-G-X)/M);!function(r,e,t,a,n,s,o){var i=function(r,e){var t=Math.sin(e),a=Math.cos(e),n=(e=r[0],r[1]),s=r[2],o=r[3];r[0]=e*a+n*t,r[1]=-e*t+n*a,r[2]=s*a+o*t,r[3]=-s*t+o*a},h=function(r,e){for(var t=0;t<e.length;t+=2){var a=e[t],n=e[t+1];e[t]=r[0]*a+r[2]*n+r[4],e[t+1]=r[1]*a+r[3]*n+r[5]}},f=function(r,e){for(var t=0;t<e.length;t++)r.push(e[t])};if(o)for(;s>n;)s-=2*Math.PI;else for(;s<n;)s+=2*Math.PI;var d=(s-n)/4,l=Math.cos(d/2),u=-Math.sin(d/2),c=(4-l)/3,v=0==u?u:(1-l)*(3-l)/(3*u),p=[c,v,c,-v,l,-u],g={cmds:["C","C","C","C"],crds:p.slice(0)},m=[1,0,0,1,0,0];i(m,-d);for(var y=0;y<3;y++)h(m,p),f(g.crds,p);i(m,d/2-n),m[0]*=1,m[1]*=1,m[2]*=1,m[3]*=1,m[4]=0,m[5]=0,h(m,g.crds),h(r.ctm,g.crds),function(r,e){f(r.cmds,e.cmds),f(r.crds,e.crds)}(r.pth,g)}({pth:e,ctm:[B*D,B*O,-M*O,M*D,H,q]},0,0,0,j,j+(J%=2*Math.PI),0==I),s=C,o=T}else console.log("Unknown SVG command "+c)}}}return{cssMap:function(r){for(var t=e(r,"{","}"),a={},n=0;n<t.length;n+=2)for(var s=t[n].split(","),o=0;o<s.length;o++){var i=s[o].trim();null==a[i]&&(a[i]=""),a[i]+=t[n+1]}return a},readTrnf:t,svgToPath:s,toPath:function(e){var a={cmds:[],crds:[]};if(null==e)return a;var n=(new DOMParser).parseFromString(e,"image/svg+xml").getElementsByTagName("svg")[0],o=n.getAttribute("viewBox");o=o?o.trim().split(" ").map(parseFloat):[0,0,1e3,1e3],function e(a,n,o){for(var i=0;i<a.length;i++){var h=a[i],f=h.tagName,d=h.getAttribute("fill");if(null==d&&(d=o),"g"==f){var l={crds:[],cmds:[]};e(h.children,l,d);var u=h.getAttribute("transform");if(u){var c=t(u);r.multArray(c,l.crds)}n.crds=n.crds.concat(l.crds),n.cmds=n.cmds.concat(l.cmds)}else if("path"==f||"circle"==f||"ellipse"==f){var v;if(n.cmds.push(d||"#000000"),"path"==f&&(v=h.getAttribute("d")),"circle"==f||"ellipse"==f){for(var p=[0,0,0,0],g=["cx","cy","rx","ry","r"],m=0;m<5;m++){var y=h.getAttribute(g[m]);y&&(y=parseFloat(y),m<4?p[m]=y:p[2]=p[3]=y)}var S=p[0],U=p[1],C=p[2],T=p[3];v=["M",S-C,U,"a",C,T,0,1,0,2*C,0,"a",C,T,0,1,0,2*-C,0].join(" ")}s(v,n),n.cmds.push("X")}}}(n.children,a);for(var i=0;i<a.crds.length;i+=2){var h=a.crds[i],f=a.crds[i+1];h-=o[0],f=-(f-=o[1]),a.crds[i]=h,a.crds[i+1]=f}return a}}}(),initHB:function(r,t){var a=function(r){var e=0;return 0==(4294967168&r)?e=1:0==(4294965248&r)?e=2:0==(4294901760&r)?e=3:0==(4292870144&r)&&(e=4),e},n=new window.TextEncoder("utf8");fetch(r).then((function(r){return r.arrayBuffer()})).then((function(r){return WebAssembly.instantiate(r)})).then((function(r){console.log("HB ready");var s=r.instance.exports,o=s.memory;o.grow(700);var i,h,f,d,l,u=new Uint8Array(o.buffer),c=new Uint32Array(o.buffer),v=new Int32Array(o.buffer);e.U.shapeHB=function(r,e,t){var o=r._data,p=r.name.postScriptName;i!=p&&(null!=h&&(s.hb_blob_destroy(h),s.free(f),s.hb_face_destroy(d),s.hb_font_destroy(l)),f=s.malloc(o.byteLength),u.set(o,f),h=s.hb_blob_create(f,o.byteLength,2,0,0),d=s.hb_face_create(h,0),l=s.hb_font_create(d),i=p);var g=s.hb_buffer_create(),m=n.encode(e),y=m.length,S=s.malloc(y);u.set(m,S),s.hb_buffer_add_utf8(g,S,y,0,y),s.free(S),s.hb_buffer_set_direction(g,t?4:5),s.hb_buffer_guess_segment_properties(g),s.hb_shape(l,g,0,0);var U=function(r){for(var e=s.hb_buffer_get_length(r),t=[],a=s.hb_buffer_get_glyph_infos(r,0)>>>2,n=s.hb_buffer_get_glyph_positions(r,0)>>>2,o=0;o<e;++o){var i=a+5*o,h=n+5*o;t.push({g:c[i+0],cl:c[i+2],ax:v[h+0],ay:v[h+1],dx:v[h+2],dy:v[h+3]})}return t}(g);s.hb_buffer_destroy(g);var C=U.slice(0);t||C.reverse();for(var T=0,b=0,x=1;x<C.length;x++){for(var F=C[x],B=F.cl;;){var M=e.codePointAt(T),w=a(M);if(!(b+w<=B))break;b+=w,T+=M<=65535?1:2}F.cl=T}return U},t()}))}};class t{static async fromUrl(r,e){return new t(await(await fetch(r)).arrayBuffer(),e)}constructor(r,t){this._font=e.parse(r)[0],this._ShapePath=t}outline(r,t={}){t=Object.assign({size:100,isLTR:!0,isCCW:!1},t);const a=this._font,n=e.U.shape(a,r,t.isLTR),{cmds:s,crds:o}=e.U.shapeToPath(a,n),i=new this._ShapePath,h=t.size/a.head.unitsPerEm;let f=0;for(const r of s)switch(r){case"M":i.moveTo(o[f++]*h,o[f++]*h);break;case"L":i.lineTo(o[f++]*h,o[f++]*h);break;case"Q":i.quadraticCurveTo(o[f++]*h,o[f++]*h,o[f++]*h,o[f++]*h);break;case"C":i.bezierCurveTo(o[f++]*h,o[f++]*h,o[f++]*h,o[f++]*h,o[f++]*h,o[f++]*h)}const d=i.toShapes(t.isCCW),l=(a.head.yMax-a.head.yMin)*h,u=n.reduce(((r,e)=>r+e.ax),0)*h,c=this._font.head.yMax*h;return{shapes:d,h:l,w:u,yMin:this._font.head.yMin*h,yMax:c}}}export default t;
//# sourceMappingURL=lib.esm.js.map
