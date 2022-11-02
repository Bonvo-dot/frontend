import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class MyAccount extends Component {

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'

    return <div className="liton__wishlist-area pb-70">
	  <div className="container">
		<div className="row">
		  <div className="col-lg-12">
			{/* PRODUCT TAB AREA START */}
			<div className="ltn__product-tab-area">
			  <div className="container">
				<div className="row">
				  <div className="col-lg-4">
					<div className="ltn__tab-menu-list mb-50">
					  <div className="nav">                                            
						<a className="active show" data-bs-toggle="tab" href="#ltn_tab_1_2">Perfil <i className="fas fa-user" /></a>
						<a data-bs-toggle="tab" href="#ltn_tab_1_4">Datos Personales <i className="fas fa-user" /></a>
						<a data-bs-toggle="tab" href="#ltn_tab_1_5">Mis Propiedades <i className="fa-solid fa-list" /></a>
						<a data-bs-toggle="tab" href="#ltn_tab_1_6">Propiedades Favoritas <i className="fa-solid fa-heart" /></a>
						<a data-bs-toggle="tab" href="#ltn_tab_1_7">Agregar Propiedad <i className="fa-solid fa-map-location-dot" /></a>
						<a data-bs-toggle="tab" href="#ltn_tab_1_8">Recompensas <i className="fa-solid fa-money-check-dollar" /></a>
					  </div>
					</div>
				  </div>
				  <div className="col-lg-8">
					<div className="tab-content">
					  <div className="tab-pane active show" id="ltn_tab_1_2">
						<div className="ltn__myaccount-tab-content-inner">
						  {/* comment-area */}
						  <div className="ltn__comment-area mb-50">
							<div className="ltn-author-introducing clearfix">
							  <div className="author-img">
								<img src={publicUrl+"assets/img/blog/author.jpg"} alt="Author" />
							  </div>
							  <div className="author-info">
								<h6>Agent of Property</h6>
								<h2>Rosalina D. William</h2>
								<div className="footer-address">
								  <ul>
									<li>
									  <div className="footer-address-icon">
										<i className="icon-placeholder" />
									  </div>
									  <div className="footer-address-info">
										<p>Brooklyn, New York, United States</p>
									  </div>
									</li>
									<li>
									  <div className="footer-address-icon">
										<i className="icon-call" />
									  </div>
									  <div className="footer-address-info">
										<p><a href="tel:+0123-456789">+0123-456789</a></p>
									  </div>
									</li>
									<li>
									  <div className="footer-address-icon">
										<i className="icon-mail" />
									  </div>
									  <div className="footer-address-info">
										<p><a href="mailto:example@example.com">example@example.com</a></p>
									  </div>
									</li>
								  </ul>
								</div>
							  </div>
							</div>
							<div className="ltn__form-box contact-form-box box-shadow white-bg">
							  <h4 className="title-2">Obtener una estimación</h4>
							  <form id="contact-form" action="mail.php" method="post">
								<div className="row">
								  <div className="col-md-6">
									<div className="input-item input-item-name ltn__custom-icon">
									  <input type="text" name="name" placeholder="Ingresar tu Nombre" />
									</div>
								  </div>
								  <div className="col-md-6">
									<div className="input-item input-item-email ltn__custom-icon">
									  <input type="email" name="email" placeholder="Ingresar tu email" />
									</div>
								  </div>
								  <div className="col-md-6">
									<div className="input-item">
									  <select className="nice-select">
										<option>Tipo de consulta</option>
										<option>Gestion de propiedades </option>
										<option>Financiamiento </option>
										<option>Consultoría</option>
										<option>Compra de propiedad</option>
										<option>Venta de propiedad</option>
									  </select>
									</div>
								  </div>
								  <div className="col-md-6">
									<div className="input-item input-item-phone ltn__custom-icon">
									  <input type="text" name="phone" placeholder="Ingresa tu teléfono" />
									</div>
								  </div>
								</div>
								<div className="input-item input-item-textarea ltn__custom-icon">
								  <textarea name="message" placeholder="Consulta" defaultValue={""} />
								</div>
								<div className="btn-wrapper mt-0">
								  <button className="btn theme-btn-1 btn-effect-1 text-uppercase" type="submit">Enviar Consulta</button>
								</div>
								<p className="form-messege mb-0 mt-20" />
							  </form>
							</div>
						  </div>
						</div>
					  </div>
					  <div className="tab-pane fade" id="ltn_tab_1_4">
						<div className="ltn__myaccount-tab-content-inner">
						  <div className="ltn__form-box">
							<form action="#">
							  <div className="row mb-50">
								<div className="col-md-6">
								  <label>Nombre:</label>
								  <input type="text" name="ltn__name" />
								</div>
								<div className="col-md-6">
								  <label>Apellido:</label>
								  <input type="text" name="ltn__lastname" />
								</div>
								<div className="col-md-6">
								  <label>Nombre de Usuario:</label>
								  <input type="text" name="ltn__lastname" placeholder="Ethan" />
								</div>
								<div className="col-md-6">
								  <label>Email:</label>
								  <input type="email" name="ltn__lastname" placeholder="example@example.com" />
								</div>
							  </div>
							  <div className="btn-wrapper">
								<button type="submit" className="btn theme-btn-1 btn-effect-1 text-uppercase">Guardar cambios</button>
							  </div>
							</form>
						  </div>
						</div>
					  </div>
					  <div className="tab-pane fade" id="ltn_tab_1_5">
						<div className="ltn__myaccount-tab-content-inner">
						  <div className="ltn__my-properties-table table-responsive">
							<table className="table">
							  <thead>
								<tr>
								  <th scope="col">Mis propiedades</th>
								  <th scope="col" />
								  <th scope="col">Fecha de ingreso</th>
								  <th scope="col">Acciones</th>
								  <th scope="col">Borrar</th>
								</tr>
							  </thead>
							  <tbody>
							  {[...Array(2).keys()].map((x) => { //map this to the array that is retrieved from the API
      							return <tr>
								  <td className="ltn__my-properties-img go-top">
									<Link to="/product-details"><img src={publicUrl+"assets/img/product-3/2.jpg"} alt="#" /></Link>
								  </td>
								  <td>
									<div className="ltn__my-properties-info">
									  <h6 className="mb-10 go-top"><Link to="/product-details">New Apartment Nice View</Link></h6>
									  <small><i className="icon-placeholder" /> Brooklyn, New York, United States</small>
									  <div className="product-ratting">
										<ul>
										  <li><a href="#"><i className="fas fa-star" /></a></li>
										  <li><a href="#"><i className="fas fa-star" /></a></li>
										  <li><a href="#"><i className="fas fa-star" /></a></li>
										  <li><a href="#"><i className="fas fa-star-half-alt" /></a></li>
										  <li><a href="#"><i className="far fa-star" /></a></li>
										  <li className="review-total"> <a href="#"> ( 95 Reviews )</a></li>
										</ul>
									  </div>
									</div>
								  </td>
								  <td>Feb 22, 2022</td>
								  <td><Link to="#">Edit</Link></td>
								  <td><Link tp="#"><i className="fa-solid fa-trash-can" /></Link></td>
								</tr>
							  })}
							  </tbody>
							</table>
						  </div>
						  <div className="ltn__pagination-area text-center">
							<div className="ltn__pagination">
							<ul>
								<li><Link to="#"><i className="fas fa-angle-double-left" /></Link></li>
								<li><Link to="#">1</Link></li>
								<li className="active"><Link to="#">2</Link></li>
								<li><Link to="#">3</Link></li>
								<li><Link to="#">...</Link></li>
								<li><Link to="#">10</Link></li>
								<li><Link to="#"><i className="fas fa-angle-double-right" /></Link></li>
							</ul>
							</div>
						</div>
						</div>
					  </div>
					  <div className="tab-pane fade" id="ltn_tab_1_6">
						<div className="ltn__myaccount-tab-content-inner">
						  <div className="ltn__my-properties-table table-responsive">
							<table className="table">
							  <thead>
								<tr>
								  <th scope="col">Propiedad</th>
								  <th scope="col" />
								  <th scope="col">Fecha Ingreso</th>
								  <th scope="col">Acciones</th>
								  <th scope="col">Borrar</th>
								</tr>
							  </thead>
							  <tbody>
							  {[...Array(2).keys()].map((x) => { //map this to the array that is retrieved from the API
      							return <tr>
								  <td className="ltn__my-properties-img go-top">
									<Link to="/product-details"><img src={publicUrl+"assets/img/product-3/2.jpg"} alt="#" /></Link>
								  </td>
								  <td>
									<div className="ltn__my-properties-info">
									  <h6 className="mb-10 go-top"><Link to="/product-details">New Apartment Nice View</Link></h6>
									  <small><i className="icon-placeholder" /> Brooklyn, New York, United States</small>
									  <div className="product-ratting">
										<ul>
										  <li><a href="#"><i className="fas fa-star" /></a></li>
										  <li><a href="#"><i className="fas fa-star" /></a></li>
										  <li><a href="#"><i className="fas fa-star" /></a></li>
										  <li><a href="#"><i className="fas fa-star-half-alt" /></a></li>
										  <li><a href="#"><i className="far fa-star" /></a></li>
										  <li className="review-total"> <a href="#"> ( 95 Reviews )</a></li>
										</ul>
									  </div>
									</div>
								  </td>
								  <td>Feb 22, 2022</td>
								  <td><Link to="#">Edit</Link></td>
								  <td><Link tp="#"><i className="fa-solid fa-trash-can" /></Link></td>
								</tr>
							  })}
							  </tbody>
							</table>
						  </div>
						  <div className="ltn__pagination-area text-center">
								<div className="ltn__pagination">
								<ul>
									<li><Link to="#"><i className="fas fa-angle-double-left" /></Link></li>
									<li><Link to="#">1</Link></li>
									<li className="active"><Link to="#">2</Link></li>
									<li><Link to="#">3</Link></li>
									<li><Link to="#">...</Link></li>
									<li><Link to="#">10</Link></li>
									<li><Link to="#"><i className="fas fa-angle-double-right" /></Link></li>
								</ul>
								</div>
							</div>
						</div>
					  </div>
					  <div className="tab-pane fade" id="ltn_tab_1_7">
						<div className="ltn__myaccount-tab-content-inner">                                                
						  <h6>Descripcion de la propiedad</h6>
						  <div className="row">
							<div className="col-md-12">
							  <div className="input-item input-item-textarea ltn__custom-icon">
								<input type="text" name="ltn__name" placeholder="*Titulo*" />
							  </div>
							  <div className="input-item input-item-textarea ltn__custom-icon">
								<textarea name="ltn__message" placeholder="Descripcion" defaultValue={""} />
							  </div>
							</div>
						  </div>
						  <h6>Precio</h6>
						  <div className="row">
							<div className="col-md-6">
							  <div className="input-item  input-item-textarea ltn__custom-icon">
								<input type="text" name="ltn__name" placeholder="$" />
							  </div>
							</div>
						  </div>
						  <h6>Listing Media</h6>
						  <input type="file" id="myFile" name="filename" className="btn theme-btn-3 mb-10" /><br />
						  <p>
							<small>* Ingrese al menos una imagen superior a 500x500px.</small><br />
							<small>* Pueden ingresarse archivos PDF.</small><br />
							<small>* Las imagenes pueden demorar en procesarse.</small>
						  </p>
						  <h6>Listing Location</h6>
						  <div className="row">
							<div className="col-md-6">
							  <div className="input-item input-item-textarea ltn__custom-icon">
								<input type="text" name="ltn__name" placeholder="Dirección*" />
							  </div>
							</div>
							<div className="col-md-6">
							  <div className="input-item input-item-textarea ltn__custom-icon">
								<input type="text" name="ltn__name" placeholder="País" />
							  </div>
							</div>
							<div className="col-md-6">
							  <div className="input-item input-item-textarea ltn__custom-icon">
								<input type="text" name="ltn__name" placeholder="Provincia / Estado / Departamento" />
							  </div>
							</div>
							<div className="col-md-6">
							  <div className="input-item input-item-textarea ltn__custom-icon">
								<input type="text" name="ltn__name" placeholder="Ciudad" />
							  </div>
							</div>
							<div className="col-lg-12">
							  <div className="property-details-google-map mb-60">
								<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9334.271551495209!2d-73.97198251485975!3d40.668170674982946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25b0456b5a2e7%3A0x68bdf865dda0b669!2sBrooklyn%20Botanic%20Garden%20Shop!5e0!3m2!1sen!2sbd!4v1590597267201!5m2!1sen!2sbd" width="100%" height="100%" frameBorder={0} allowFullScreen aria-hidden="false" tabIndex={0} />
							  </div>
							</div>
							<div className="col-md-6">
							  <div className="input-item input-item-textarea ltn__custom-icon">
								<input type="text" name="ltn__name" placeholder="Latitud (Google Maps)" />
							  </div>
							</div>
							<div className="col-md-6">
							  <div className="input-item input-item-textarea ltn__custom-icon">
								<input type="text" name="ltn__name" placeholder="Longitud (Google Maps)" />
							  </div>
							</div>
						  </div>
						  <h6>Detalles de la publicación</h6>
						  <div className="row">
							<div className="col-md-6">
							  <div className="input-item input-item-textarea ltn__custom-icon">
								<input type="text" name="ltn__name" placeholder="Tamaño en m2" />
							  </div>
							</div>
							<div className="col-md-6">
							  <div className="input-item input-item-textarea ltn__custom-icon">
								<input type="text" name="ltn__name" placeholder="Ambientes" />
							  </div>
							</div>
							<div className="col-md-6">
							  <div className="input-item input-item-textarea ltn__custom-icon">
								<input type="text" name="ltn__name" placeholder="Dormitorios" />
							  </div>
							</div>
							<div className="col-md-6">
							  <div className="input-item input-item-textarea ltn__custom-icon">
								<input type="text" name="ltn__name" placeholder="Baños" />
							  </div>
							</div>
							<div className="col-md-6">
							  <div className="input-item input-item-textarea ltn__custom-icon">
								<input type="text" name="ltn__name" placeholder="Garages (*text)" />
							  </div>
							</div>
						  </div>
						  <div className="btn-wrapper text-center--- mt-30">
							<button className="btn theme-btn-1 btn-effect-1 text-uppercase" type="submit">Guardar propiedad</button>
						  </div>
						</div>
					  </div>
					  <div className="tab-pane fade" id="ltn_tab_1_8">
						<div className="ltn__myaccount-tab-content-inner">
						  <div className="row">							
							<div className="col-lg-12">
							  <div className="mt-50">
								<h4 className="title-2">Bonvo Balance</h4>
								<table className="table no-background">
								  <tbody>
									<tr>
									  <td>1000 Bonv <strong>× 2</strong></td>
									  <td>
										<a className='btn btn-effect-3 btn-white'>Enviar</a>
										<a className='btn btn theme-btn-1 btn-effect-1'>Recibir</a>
									  </td>
									</tr>
								  </tbody>
								</table>
							  </div>
							</div>
						  </div>
						  <div className="row">							
							<div className="col-lg-12">
							  <div className="mt-50">
								<h4 className="title-2">Historial</h4>
								<table className="table">
								  <tbody>
									<tr>
									  <td> <a href='#'>http://bonvo.com/propiedad-1</a> </td>
									  <td>
										0.2222123
									  </td>
									</tr>
									<tr>
									  <td> <a href='#'>http://bonvo.com/propiedad-2</a> </td>
									  <td>
										0.3124124
									  </td>
									</tr>
								  </tbody>
								</table>
							  </div>
							</div>
							<div className="row">							
								<div className="col-lg-12">
									<div className="mt-50">
										<h4 className="title-2">NFT</h4>
										<p>Work in progress</p>
									</div>
								</div>
							</div>
						  </div>
						</div>
					  </div>					  
					</div>
				  </div>
				</div>
			  </div>
			</div>
			{/* PRODUCT TAB AREA END */}
		  </div>
		</div>
	  </div>
	</div>
	
        }
}

export default MyAccount