const s=["fluent-emoji-high-contrast","material-symbols-light","cryptocurrency-color","icon-park-outline","icon-park-twotone","fluent-emoji-flat","emojione-monotone","streamline-emojis","heroicons-outline","simple-line-icons","material-symbols","qlementine-icons","flat-color-icons","icon-park-solid","pepicons-pencil","heroicons-solid","pepicons-print","cryptocurrency","pixelarticons","bitcoin-icons","system-uicons","devicon-plain","entypo-social","token-branded","grommet-icons","meteor-icons","svg-spinners","pepicons-pop","fluent-color","vscode-icons","simple-icons","fluent-emoji","circle-flags","medical-icon","icomoon-free","majesticons","humbleicons","rivet-icons","radix-icons","fa6-regular","skill-icons","emojione-v1","academicons","healthicons","fluent-mdl2","lucide-lab","akar-icons","lets-icons","ant-design","gravity-ui","teenyicons","streamline","file-icons","catppuccin","fa6-brands","game-icons","foundation","fa-regular","mono-icons","mdi-light","hugeicons","iconamoon","eos-icons","gridicons","duo-icons","lineicons","zondicons","heroicons","fa6-solid","icon-park","arcticons","meteocons","dashicons","fa-brands","websymbol","fontelico","mingcute","flowbite","proicons","guidance","famicons","bytesize","marketeq","nonicons","brandico","openmoji","emojione","flagpack","fa-solid","fontisto","si-glyph","pepicons","line-md","iconoir","tdesign","formkit","clarity","octicon","pajamas","codicon","devicon","twemoji","noto-v1","fxemoji","raphael","flat-ui","topcoat","feather","tabler","mynaui","lucide","circum","carbon","lsicon","nimbus","fluent","memory","garden","entypo","icons8","subway","vaadin","solar","basil","typcn","prime","cuida","stash","charm","quill","codex","logos","token","covid","weui","mage","maki","ooui","unjs","noto","flag","iwwa","gala","zmdi","bpmn","mdi","uil","bxs","uim","uit","uis","jam","ion","cil","uiw","oui","nrk","cib","bxl","cbi","cif","gis","map","geo","fad","eva","wpf","whh","ic","ri","si","bx","gg","ci","fe","mi","ep","bi","ph","ix","ei","f7","wi","la","fa","oi","et","el","ls","vs","il","ps"];function l(i=""){let n,e="";if(i[0]==="@"&&i.includes(":")&&(e=i.split(":")[0].slice(1),i=i.split(":").slice(1).join(":")),i.startsWith("i-")){i=i.replace(/^i-/,"");for(const o of s)if(i.startsWith(o)){n=o,i=i.slice(o.length+1);break}}else if(i.includes(":")){const[o,c]=i.split(":");n=o,i=c}return{provider:e,prefix:n||"",name:i||""}}export{l as r};
