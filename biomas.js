// Conteúdo e sequência recuperados do protótipo anterior.
export const biomas = [
 {name:'Amazônia',sky:0x9dcfe0,ground:0x5b8150,wall:0x24623d,vegetation:'forest',questions:[
 ['Qual é uma consequência direta do desmatamento?',['Perda de habitats e espécies','Aumento imediato das chuvas','Criação de mais florestas'],0,'A floresta abriga espécies que dependem de seus habitats.'],
 ['Uma forma de ajudar a proteger a Amazônia é...',['Comprar madeira sem origem conhecida','Valorizar produtos de origem responsável','Provocar queimadas para abrir caminhos'],1,'O consumo responsável reduz a pressão sobre os recursos naturais.']]},
 {name:'Cerrado',sky:0xded5ab,ground:0xb59759,wall:0x827345,vegetation:'savanna',questions:[
 ['Por que o Cerrado é importante para a água do Brasil?',['Porque não tem nascentes','Porque abriga nascentes de grandes bacias','Porque só existe em áreas alagadas'],1,'O Cerrado contribui para a alimentação de grandes bacias hidrográficas.'],
 ['Uma ameaça ao Cerrado é...',['A conversão de vegetação nativa em áreas agrícolas','A proteção de áreas naturais','A recuperação de nascentes'],0,'A conversão da vegetação fragmenta habitats e afeta a água.']]},
 {name:'Pantanal',sky:0xb6dce8,ground:0x769e78,wall:0x497c65,vegetation:'wetland',questions:[
 ['O que ameaça fortemente a fauna do Pantanal?',['Incêndios de grande extensão','Proteção de áreas úmidas','Monitoramento da biodiversidade'],0,'Incêndios intensos podem destruir habitats e matar animais.'],
 ['Por que o ciclo das cheias é importante?',['Mantém a dinâmica ecológica das áreas úmidas','Impede toda a vida aquática','Elimina a vegetação nativa'],0,'As cheias sustentam processos ecológicos e a diversidade do Pantanal.']]},
 {name:'Mata Atlântica',sky:0xb6e4eb,ground:0x50845e,wall:0x285c48,vegetation:'forest',questions:[
 ['Qual é um dos principais problemas da Mata Atlântica?',['Fragmentação de habitats','Excesso de floresta contínua','Ausência de cidades próximas'],0,'A fragmentação isola populações de plantas e animais.'],
 ['O que ajuda a recuperar esse bioma?',['Restaurar áreas com espécies nativas','Descartar lixo nos rios','Remover matas ciliares'],0,'A restauração com espécies nativas favorece a biodiversidade.']]},
 {name:'Caatinga',sky:0xf2d5ac,ground:0xc5a373,wall:0x9b8059,vegetation:'cactus',questions:[
 ['A Caatinga é...',['Um bioma exclusivamente brasileiro','Uma floresta sempre alagada','Um deserto sem biodiversidade'],0,'A Caatinga tem espécies adaptadas às condições do semiárido.'],
 ['Qual prática ajuda a evitar a degradação do solo?',['Manejo sustentável da vegetação','Desmatamento indiscriminado','Queimadas frequentes'],0,'O manejo sustentável contribui para a conservação do solo.']]},
 {name:'Pampa',sky:0xa8d6f1,ground:0x8aac65,wall:0x68864f,vegetation:'grass',questions:[
 ['Qual paisagem é típica do Pampa?',['Campos com vegetação herbácea','Florestas de mangue','Geleiras permanentes'],0,'O Pampa apresenta extensas formações campestres.'],
 ['O que ameaça a biodiversidade do Pampa?',['Substituição dos campos nativos por outros usos','Conservação dos campos','Manejo adequado do pastoreio'],0,'A conversão dos campos nativos reduz habitats característicos.']]}
];
// Labirintos retangulares; todos os objetivos são alcançáveis sem atravessar a saída.
const layouts = [
 ['###########','#S...#....#','#.##.#.##.#','#....#....#','###.###.#.#','#...Q...#.#','#.#####.#.#','#...#...#.#','#.#.#.###.#','#Q#......E#','###########'],
 ['###########','#S..#.....#','#.#.#.###.#','#.#...#...#','#.#####.#.#','#.....Q.#.#','#####.###.#','#.....#...#','#.###.#.#.#','#Q.......E#','###########']
];
export function makeMap(level){const map=layouts[level%2].map(r=>[...r]);if(level>=2){for(let y=1;y<10;y++)for(let x=1;x<10;x++){if((x*3+y*7+level)%19===0&&map[y][x]==='#')map[y][x]='.';}}return map;}
export class Game {
 constructor(){this.level=0;this.score=0;this.load();}
 load(){this.map=makeMap(this.level);this.x=1;this.y=1;this.dir=0;this.steps=0;this.solved=new Set();this.pending=null;this.complete=false;}
 get biome(){return biomas[this.level];}
 get unlocked(){return this.solved.size===2;}
 move(back=false){if(this.pending||this.complete)return 'paused';const [dx,dy]=[[1,0],[0,1],[-1,0],[0,-1]][this.dir];const x=this.x+dx*(back?-1:1),y=this.y+dy*(back?-1:1),cell=this.map[y]?.[x];if(!cell||cell==='#')return 'wall';if(cell==='E'&&!this.unlocked)return 'locked';this.x=x;this.y=y;this.steps++;const key=x+','+y;if(cell==='Q'&&!this.solved.has(key)){this.pending=key;return 'question';}if(cell==='E'){this.complete=true;return 'complete';}return 'moved';}
 turn(n){if(!this.pending&&!this.complete)this.dir=(this.dir+n+4)%4;}
 answer(i){if(!this.pending)return false;const q=this.biome.questions[this.solved.size];if(i!==q[2])return false;this.solved.add(this.pending);this.pending=null;this.score++;return true;}
 next(){if(!this.complete)return false;if(this.level===5){this.level=0;this.score=0;}else this.level++;this.load();return true;}
}
