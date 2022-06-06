const autos = require('./autos');

let concesionaria = {
   autos: autos,
 
   buscarAuto: function (patente) {
      let retorno = null;
      for ( let i = 0 ; i < this.autos.length; i++ )  {
         if (this.autos[i].patente == patente) {
            retorno = autos[i];
         }
      }
      return retorno;
   },

   venderAuto: function (patente) {
      let autoVendido = this.buscarAuto(patente);
      autoVendido.vendido = true;
   },

   autosParaLaVenta: function() {
      let autosDisponibles = this.autos.filter(function (auto) {
         return auto.vendido == false;
      });
      return autosDisponibles;
   },

   autosNuevos: function() {
      let disponibles = this.autosParaLaVenta();
      let autos0KM = disponibles.filter(function(auto) {
         return auto.km <= 100; 
      });
      return autos0KM;
   },

   totalDeVentas: function() {
      let vendidos = [];
      this.autos.forEach(function(auto) {
         if (auto.vendido == true) {
            vendidos.push(auto.precio);
         }
      });
      let total = vendidos.reduce(function(acum,auto) {
         return acum + auto;   
      } , 0 );
      return total;
   },

   puedeComprar: function(auto,persona) {
      if ( auto.precio <= persona.capacidadDePagoTotal ) {
         if ( (auto.precio / auto.cuotas) <= persona.capacidadDePagoEnCuotas) {
            return true;
         }
         else {
            return false;
         }
      }
      else {
         return false;
      }
   },

   autosQuePuedeComprar: function(persona) {
      let autos = this.autosParaLaVenta();
      let posiblesAutos = autos.filter( auto => this.puedeComprar(auto,persona) == true );
      return posiblesAutos;
   } 
}
