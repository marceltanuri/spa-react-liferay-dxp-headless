const liferayDXP_URL = 'https://webserver-liferaymarceltanuri-prd.lfr.cloud';
const liferaySiteId = 20123;

class Promotion extends React.Component {
	  constructor(props) {
			super(props);
		}
		
	  render() {
		const element = (
			<div>
				<h4 className='text-center'>{this.props.name}</h4>
				<img style={{width:300+'px'}} src={this.props.image}></img><br/><br/>
				<div className='text-center'>{this.props.expirationDate}</div><br/>
				<p>{this.props.description}</p>
				<p><i style={{fontSize: 9+'px'}}>{this.props.termsOfUse}</i></p>
			</div>
		  );
			return element
	  }
	}

	class PromotionsList extends React.Component {

		constructor(props) {
			super(props);
			this.state = {promos:{}}
		}

		componentDidMount() {
			fetch(this.props.getPromosUrl, {
				"async": true,
				"crossDomain": true,
				"method": "GET",
				"headers": {
					"Authorization": "Basic dGVzdEBsaWZlcmF5LmNvbTp0ZXN0ZQ==",
					"cache-control": "no-cache"
				}
			}).then(response => response.json()).then(result => {
				this.setState({
					promos: result.items}
				);
		});
	  }

		render() {
			let promosList = Array.from(this.state.promos).map(function (promo, index) {
				let contentFields = promo.contentFields
				let element = (
					<div className='col-4' key={index}>
						<div className='card h-100'>
							<div className='card-body'>
							<Promotion termsOfUse= {contentFields[2].nestedFields[0].value.data} expirationDate={new Date(contentFields[0].value.data)!=''?'Somente até '+new Date(contentFields[0].value.data).toLocaleDateString('pt-BR'):''}  name={contentFields[1].value.data} description={contentFields[2].value.data} image={liferayDXP_URL + contentFields[3].value.image.contentUrl} />
							</div>
						</div>
					</div>
				);
				return element
			})
			return  <div className='card-group'>{ promosList }</div>
		}
	};

let filteringTag = 'promo';
ReactDOM.render(<PromotionsList getPromosUrl={liferayDXP_URL + "/o/headless-delivery/v1.0/sites/"+liferaySiteId+"/structured-contents?filter=keywords/any(k:k eq '"+filteringTag+"')"}/>, document.querySelector('#promocoes'));
