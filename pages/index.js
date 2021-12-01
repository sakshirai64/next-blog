import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Toolbar } from '../component/Toolbar';
import {useState, useEffect} from 'react';
import imageUrlBuilder from '@sanity/image-url';
import { useRouter} from 'next/router';

export default function Home({posts}) {

  let p;
  const router= useRouter();
  const[mappedPost, setMappedPost]=useState([]);
 
  useEffect(() => {
    if (posts.length) {
      const imgBuilder = imageUrlBuilder({
        projectId: 'mggztm0l',
        dataset: 'production',
      });

      setMappedPost(
        posts.map(p => {
          return {
            ...p,
            mainImage: imgBuilder.image(p.mainImage).width(500).height(250),
          }
        })
      );
    } else {
      setMappedPost([]);
    }
  }, [posts]);

  return (
    
    <div>
      <Toolbar />
      <div className={styles.main}>
        <h1>welcome to my blog</h1>
        <h3> Recent posts:</h3>

        <div className={styles.feed}>
          {mappedPost.length ? mappedPost.map((p, index) => (
            <div onClick={() => router.push(`/post/${p.slug.current}`)} key={index} className={styles.post}>
              <h3>{p.title}</h3>
              <img className={styles.mainImage} src={p.mainImage} />
            </div>
          )) : <>No Posts Yet</>}
        </div>
      </div>
    </div>
  )
};
export const getServerSideProps = async pageContext =>{

  const query= encodeURIComponent('*[ _type== "post"] ');
  const url= `https://mggztm0l.api.sanity.io/v1/data/query/production?query=${query}`;

  const result= await fetch(url).then(res=>res.json());
   
  if(!result.result || !result.result.length)
  {
    return{
      props:{
        posts :[],
      }
    }
  }
  else{
    return{
      props:{
        posts :result.result,
      }
    }
  }
};
