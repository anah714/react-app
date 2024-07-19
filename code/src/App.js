//import logo from './logo.svg';
import './App.css';
import {useState} from 'react'; //srate를 사용하기 위해서 꼭 넣아야함.

function Header(props) { 
  console.log('props',props.title)
  return(
    <header>
      <h1><a href="/" onClick={(event)=>{
          event.preventDefault();
          props.onChangeMode();
      }}>{props.title}</a></h1>
    </header>
  )
}

function Nav(props) {
  const lis = []

  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/' + t.id} onClick={event => {
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));
      }}>{t.title}</a>
      </li>);
  }
  return (
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  )
}

function Article(props) {
  return(
    <article>
    <h2>{props.title}</h2>
      {props.body}
  </article>


  )
}

function Create(props) {
  return < article >
      <h2>Create</h2>
      <form onSubmit={event => {
        event.preventDefault();;
        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onCreate(title, body);
      }}>

        <p><input type="text" name="title" placeholder="title"/></p>
        <p><textarea name="body" placeholder="body"></textarea></p>
        <p><input type="submit" value="Create"></input></p>
      </form>
    </article >
  
}

function App() {
  const [mode, setMode] = useState('welcome');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);

  const [topics, setTopics] = useState([
    {id:1,title:'html', body:'html is...'},
    {id:2,title:'CSS', body:'CSS is...'},
    {id:3,title:'JS', body:'JS is...'}
  ]);

  console.log('mode', mode);

  let content = null;

  if(mode === 'welcome') {
    content = <Article title = "welcome" body="hello, web"></Article>
  }else if(mode === 'read') {
    let title, body = null;
    for(let i =0; i<topics.length; i++) {
      console.log(topics[i].id, id);

      if(topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
  }else if(mode === 'CREATE') {
    content = <Create onCreate={(title,body) => {
      const newTopic = {id:nextId, title:title, body:body} 
      const newTopics = [...topics]
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);
    }}></Create>
  }

  return (
    <div>
      <Header title="react!" onChangeMode={() => {
       setMode('welcome');
      }}></Header>

      <Nav topics={topics} onChangeMode={(id) => {
       setMode('read');
       setId(id);
      }}></Nav>

      {content}
      
      <a href="/create" onClick={event=> {
        event.preventDefault();
        setMode('CREATE');
      }}>Create</a>

      <Article title="welcome!" body="hello, Web!"></Article>
      <div></div>
    </div>
  );
}

export default App;
