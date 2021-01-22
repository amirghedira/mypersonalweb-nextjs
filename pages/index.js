import React from "react";
import Tabs from "../components/Tabs/Tabs";
import Support from "../components/Support/Support.js";
import { Row, Col } from "reactstrap";
import SidebarLeft from '../components/SidebarLeft/SidebarLeft'
import SidebarRight from '../components/SidebarRight/SidebarRight'
import classes from '../styles/index.module.css'
import Axios from "axios";
import axios from '../utils/axios'
import Head from 'next/head'
function Index(props) {

  const [projects, setProjects] = React.useState(props.projects)

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, [])

  const savechangesHandler = (info) => {
    const index = projects.findIndex(project => { return project._id === info.id })
    const Newproject = {
      ...projects[index],
      summary: info.content
    }
    axios.patch('/project/' + info.id, { propName: 'summary', value: info.content })
      .then(result => {
        const NewProjects = [...projects]
        NewProjects[index] = Newproject
        setProjects([...NewProjects])
      })
      .catch(err => { context.ErrorAccureHandler(); })

  }

  return (
    <main>
      <Head>
        <title>{`Amir Platform`}</title>
        <meta name="title" content={`Amir Platform`} />
        <link rel="canonical" href={`https://www.amir-ghedira.com`} />
        <meta property="og:url" content={`https://www.amir-ghedira.com`} />
        <meta property="og:title" content={'Amir Platform'} />
        <meta property="og:image" content="https://www.amir-ghedira.com/logo.png" />
      </Head>
      <div>
        <div className="wrapper">
          <Row>
            <Col className={classes.sideBar} xs="2">
              <SidebarLeft />
            </Col>
            <Col>
              <Tabs projects={projects} savechanges={savechangesHandler} />
            </Col>
            <Col className={classes.sideBar} xs="2">
              <SidebarRight projects={projects} topicsCount={props.topicsCount} />
            </Col>
          </Row>
          <Support />
        </div>
      </div>
    </main>

  );
}

export const getServerSideProps = async () => {

  const result = await Axios.get(`https://mywebrestapi.herokuapp.com/project`)
  const resultCount = await Axios.get('https://mywebrestapi.herokuapp.com/topic/counttopic')
  return {
    props: {
      projects: result.data.result,
      topicsCount: resultCount.data.result
    },
  }
}

export default Index;
