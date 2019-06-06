const liferayDXP_URL = 'http://localhost:8080';
const liferaySiteId = 20123;

class Promotion extends React.Component {
	  constructor(props) {
			super(props);
			this.state = {expirationDate: "", name: "", description: "", termsOfUse:"", image: {src:"", alt:""}};
		}
		
		componentDidMount() {
			fetch(this.props.url, {
				"async": true,
				"crossDomain": true,
				"method": "GET",
				"headers": {
					"Authorization": "Basic dGVzdEBsaWZlcmF5LmNvbTp0ZXN0ZQ==",
					"cache-control": "no-cache"
				}
			}).then(response => response.json()).then(result => {
				let contentFields = result.items[0].contentFields;
				this.setState({
					expirationDate: new Date(contentFields[0].value.data)!=''?'Somente até '+new Date(contentFields[0].value.data).toLocaleDateString('pt-BR'):'',
					name: contentFields[1].value.data,
					description: contentFields[2].value.data,
					termsOfUse: contentFields[2].nestedFields[0].value.data,
					image: {src: liferayDXP_URL + contentFields[3].value.image.contentUrl, alt: contentFields[3].value.image.description}
				});
		});
	  }

	  render() {
		const element = (
			<div>
				<h4 className='text-center'>{this.state.name}</h4>
				<img style={{width:300+'px'}} src={this.state.image.src} alt={this.state.image.alt}></img><br/><br/>
				<div className='text-center'>{this.state.expirationDate}</div><br/>
				<p>{this.state.description}</p>
				<p><i style={{fontSize: 9+'px'}}>{this.state.termsOfUse}</i></p>
			</div>
		  );
			return element
	  }
	}

const promos = ['TGVES', 'OEIJR', 'IUEHF'];

promos.forEach(function(promoId) {
	let col = document.createElement("div");
	col.setAttribute('class', 'col-4');
	col.setAttribute('style', 'margin-bottom:30px;');
	
	let card = document.createElement("div");
	card.setAttribute('class', 'card h-100');

	let div = document.createElement("div");
	div.setAttribute('id', promoId);
	div.setAttribute('class', 'card-body');

	col.append(card);
	card.append(div);
	document.querySelector('#promocoes').append(col)

	let _getPromoUrl = liferayDXP_URL+"/o/headless-delivery/v1.0/sites/"+liferaySiteId+"/structured-contents?filter=title eq '"+promoId+"'&fields=contentFields";
	ReactDOM.render(React.createElement(Promotion, {id: promoId, url: _getPromoUrl}, null), document.querySelector('#'+promoId));
});