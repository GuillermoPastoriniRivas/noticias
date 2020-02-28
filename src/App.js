import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			items: [],
			isLoaded: false
		}
	}

	componentDidMount() {
		fetch('http://newsapi.org/v2/everything?q=argentina&pageSize=99&language=es&sortBy=publishedAt&apiKey=97488189a6614f30b543d6e0375fa045')
			.then(res => res.json())
			.then(json => {
				this.setState({
					isLoaded: true,
					items: json
				})
			});
	}

	

	render() {
		
		var { isLoaded, items } = this.state;
		if (!isLoaded) {
			return <div>Cargando noticias</div>
		}
		else {
			return (
				<div className="row no-gutters App ">
					{console.log(items.articles)}
					{items.articles.map((item) =>
						<div className="col-md-4 d-flex" key={item.url}>
							<div className="blog-entry ftco-animate">
								<a target="_blank" href={item.url} className="img"
									style={{ backgroundImage: `url(${item.author==='lanacion.com' ? ("http://" + item.urlToImage.slice(29)): item.urlToImage})` }} ></a>
								<div className="text p-4">
									<h3 className="mb-2"><a target="_blank" href={item.url}>{item.title}</a></h3>
									<div className="meta-wrap">
										<p className="meta">
											<span><i className="icon-calendar mr-2"></i>Sep, 10 2019</span>
											<span><a href={item.url}><i
												className="icon-folder-o mr-2"></i>Noticias</a></span>
										</p>
									</div>
									<p className="mb-4">{item.content=== null ? item.description : item.content} </p>
									<p><a target="_blank" href={item.url} className="btn-custom">Seguir leyendo <span
										className="ion-ios-arrow-forward"></span></a></p>
								</div>
							</div>
						</div>)}
				</div>
			);
		}
	}
}

export default App;
