<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Classcartelera
 *
 * @author hely
 */
/*include("conector.php");*/
	class  Restricciones {
		private static $instance;
		function __construct() {
	       
	    }

        public static function instance() {
	        if (!isset(self::$instance)) {
	            $c = __CLASS__;
	            self::$instance = new $c;
	        }
	        return self::$instance;
   		 }

   		 function SeleccionarEdificio(){
			$this->mysqli = new mysqli(Host, User, Pass, BasedeDatos);
			$this->tupla="SELECT Nombre, idEdificio FROM  edificio";
			$this->resultado = $this->mysqli->query($this->tupla);
			$this->objeto[0]['m']=$this->resultado->num_rows;	
			$this->i=0;
			while($this->db_resultado = mysqli_fetch_array($this->resultado, MYSQLI_ASSOC))
			{				
				$this->objeto[$this->i]['nombre']=$this->db_resultado['Nombre'];
				$this->objeto[$this->i]['idEdificio']=$this->db_resultado['idEdificio'];
				$this->i++;	
			}		
			$this->mysqli->close();
			return json_encode($this->objeto);
		}

		public function SeleccionarPïsos($idEdificio){
			$this->mysqli = new mysqli(Host, User, Pass, BasedeDatos);
			$this->idEdificio=$idEdificio;
			$this->tupla="SELECT DISTINCT Piso FROM  apartamento where  idEdificio='$idEdificio'";
			$this->resultado = $this->mysqli->query($this->tupla);
			$this->objeto[0]['m']=$this->resultado->num_rows;	
			$this->i=0;
			while($this->db_resultado = mysqli_fetch_array($this->resultado, MYSQLI_ASSOC)){
				$this->objeto[$this->i]['idPiso']=$this->db_resultado['Piso'];
				$this->i++;	
			}		
			$this->mysqli->close();
			return json_encode($this->objeto);
		}

		public function SeleccionarApartamento($idPiso, $idEdificio){
			$this->mysqli = new mysqli(Host, User, Pass, BasedeDatos);
			$this->idPiso=$idPiso;
			$this->idEdificio=$idEdificio;
			$this->tupla="SELECT  apartamento.idApartamento, apartamento.Nombre  FROM  apartamento  WHERE  apartamento.idEdificio=$this->idEdificio and apartamento.Piso=$this->idPiso";
			$this->resultado = $this->mysqli->query($this->tupla);
			$this->objeto[0]['m']=$this->resultado->num_rows;	
			$this->i=0;
			while($this->db_resultado = mysqli_fetch_array($this->resultado, MYSQLI_ASSOC))
			{				
				$this->objeto[$this->i]['idapartamento']=$this->db_resultado['idApartamento'];
				$this->objeto[$this->i]['Nombre']=$this->db_resultado['Nombre'];					
				$this->i++;	
			}		
			$this->mysqli->close();
			return json_encode($this->objeto);
		}
                public function SeleccionarApartamentoEdificio($idEdificio){
			$this->mysqli = new mysqli(Host, User, Pass, BasedeDatos);
			$this->idEdificio=$idEdificio;
			$this->tupla="SELECT  apartamento.idApartamento, apartamento.Nombre  FROM  apartamento  WHERE  apartamento.idEdificio=$this->idEdificio";
			$this->resultado = $this->mysqli->query($this->tupla);
			$this->objeto[0]['m']=$this->resultado->num_rows;	
			$this->i=0;
			while($this->db_resultado = mysqli_fetch_array($this->resultado, MYSQLI_ASSOC))
			{				
				$this->objeto[$this->i]['idapartamento']=$this->db_resultado['idApartamento'];
				$this->objeto[$this->i]['Nombre']=$this->db_resultado['Nombre'];					
				$this->i++;	
			}		
			$this->mysqli->close();
			return json_encode($this->objeto);
		}
                
                function restringir(){
                    session_start();
                    echo json_encode($_SESSION["TipoUsuario"]);
                    
                }
		
	}

?>