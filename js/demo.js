const liferayDXP_URL = 'http://localhost:8080';
const liferaySiteId = 20123;

class Promotion extends React.Component {
	  constructor(props) {
			super(props);
			this.state = {html: ""};
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
				this.setState({
					html: result.items[0].contentFields[0].value.data.replace('/documents/',liferayDXP_URL+'/documents/')
				});
		});
	  }

	  render() {
			return React.createElement('div', { dangerouslySetInnerHTML: {__html: '<h4>'+ this.props.id + '</h4>' + this.state.html} });
	  }
	}

const promos = ['FVREY', 'IDIJB', 'EGJKV', 'CFEVB', 'FVBKN'];

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

	let _getPromoUrl = liferayDXP_URL+"/o/headless-delivery/v1.0/sites/"+liferaySiteId+"/structured-contents?filter=title eq '"+promoId+"'&fields=contentFields.value.data";
	ReactDOM.render(React.createElement(Promotion, {id: promoId, url: _getPromoUrl}, null), document.querySelector('#'+promoId));
});