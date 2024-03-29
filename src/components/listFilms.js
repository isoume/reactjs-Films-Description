import React,{Component, Fragment} from 'react'
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia';
import DataLocal from '../services/dataLocal';

 






const stylesCard = 
{
    media: {
    height: 0,
    paddingTop: '56%', 
    marginTop:'0',
    borderRadius:'50px'
    }
};



class ListeFilm extends Component{
    API="https://api.tvmaze.com/search/shows?";
    QUEST="q=test"
    data={
        elements: [],
        ifData:false
    }
    
    constructor(props){
        super(props) 
        this.getdataFromAPI()
    }
     
     

     getdataFromAPI(){
         fetch(this.API+this.QUEST)
         .then(res =>res.json())
         .then(res=> {
              
             this.setData({elements:res,ifData:true})
         })
         .catch( e=>{
             console.log(" il narrive pas récupérer les données")
              
         })
     }

     setData(value){ 
        this.data=value
        this.setState(value)
     }

     render(){ 
       let films =this.data.elements.map(film=>{
           var imageUrl="../iconnu.png"
           if(film.show.image !=null) 
            imageUrl=film.show.image.medium
           return(

                <Card onClick={()=> {this.description(film)} } raised="true" lg={6} xs={12} >
                    <CardHeader title={film.show.name} align="center"/>

                    <CardMedia  
                            style={stylesCard.media}
                            image	={imageUrl}
                            title={film.show.type}
                        /> 
                </Card>
           )
       });
       
        
        return(
            <Fragment>
                {films}
            </Fragment>
        )
        
     
    }


    description(item){
        let path = '/descriptionFilm';
        this.props.history.push(path);
        DataLocal.setData(item)
        
    }
}

 
export default ListeFilm;