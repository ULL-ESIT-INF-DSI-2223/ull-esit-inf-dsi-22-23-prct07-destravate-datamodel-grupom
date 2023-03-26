# Práctica 7 : DeStravaTe
## Por Daniel Felipe Gómez Aristizabal y Facundo José García Gallo


### Índice

1. [Introducción](#introducción)

    1.1. [Idea General](#idea-general)

2. [Entidades](#entidades)
    
    2.1. [Usuario](#usuario)

    2.2. [Ruta](#ruta)

    2.3. [Grupo](#grupo)

    2.4. [Reto](#reto)

3. [Colecciones](#colecciones)

    3.1. [Coleccion Usuario](#coleccion-usuario)

    3.2. [Coleccion Ruta](#coleccion-ruta)

    3.3. [Coleccion Grupo](#coleccion-grupo)
    
    3.4. [Coleccion Reto](#coleccion-reto)

4. [Enumerados](#enumerados)

5. [Interfaces](#interfaces)

6. [Tipos](#tipos)

6. [Utilidades](#utilidades)

7. [Conclusión](#conclusión)

8. [Bibliografía](#bibliografía)

### Introducción



#### Idea General

### Entidades

El programa esta compuesto por cuatro entidades principales, las cuales hemos modelado a partir de cuatro clases. Dichas clases siguen los requisitos propuestos en el guión de la práctica. A continuación describiremos cada uno de ellos de forma detallada, explicando el funcioanmeinto y las decisiones de diseño que hemos tomado.

#### Usuario

La clase Usuario como su nombre indica modela el comportamiento de nuestras instancias de *Usuario* se pretende entonces agragar todas las propiedades que permitan describir su comportamiento.

La clase cuenta con una propiedad privada y estática *_contadorUsuario* que permite de froma secuencial definir un *_id* único para cada usuario que permite identificar de forma única en toda la Base de Datos a cada usuario, este contador se consigue de ir incrementando el contador de usuarios.

Los usuarios podrán realizar *Actividades*, estas actividades son montar en bicicleta o correr. Debido a que deseabamos evitar que por algún motivo se añada más de uan vez alguna de las actividades mencionadas, definimos el atributo *_actividades* como una propiedad privada de tipo *Set<Actividades>*.

(Para más información de *Actividades* vease [Enumerados](#enumerados))

Un usuario podrá hacer *Rutas* y deseamos saber cuando las ha realizado. Teniendo en cuenta que se podría realizar más de una ruta al día, hemos considerado que un *Map<string, number[]>* sería perfecto. La idea es guardar como clave el día que el usuario realiza una ruta. Por otro lado nuestor valor será un *array* de números que permiten alamacenar los *id's* de las *Rutas* realizadas. 

Veamos que lo anterior nos proporciona grandes ventajas, por ejemplo ahora pdoemos determinar de forma sencilla las rutas que a realizado el usuario en **x** día.

Otra característica importante de un usuario son sus estadísticas, estas deseamos que sean calculadas en base a la semana, mes y año. Para conseguir esto hemos definido un *type* el cual se explicará más adelante. (Vease [Tipos](#tipos))

Los usuarios podrán ser amigos de otros usuarios, para esto regsitraremos sus amigos en un arreglo de números *_amigos*, donde se guardarán los *îd's* de los amigos. Algo Similar se hará con los grupos, un usuario podrá pertencer a grapos y para presenciar a cuales pertenece, lo almacenaremos en una propiedad *_gruposAmigos* que es un array de números.

Finalmente, podrán hacer parte de *Retos*, los cuales estarán almacenados como *id's* en *_retosActivos*.

El Constructor de la clase es realmente sencillo, define mediante los parámetros el nombre del usuario y el array de actividades que realiza.

Luego simplemente haremos uso de la tecnica que comentamos con la variable de clase *_contadorUsuario* para definir un *id* único a dicho usuario.

CCCCCCCCCCCCCCCCCCCContructor?

Como hemos visto anteriormente, todas nuestras propiedades son *private*, sin embargo, necesitamos hacer uso de sus valores en ocasiones, es por esto que definimos *getters* para rodas las propiedades.

Debemos tener presente siempre que este programa tendrá persistencia en memoria y esto significa que debemos estar preparados apra recurperar datos que se han guardado de sesiones previas. Para esto nos apoyamos en clases que hablaremos más adelante como es el caso de ManejadorJSON o ColeccionUsuarios. De momento lo que debemos tener presente es que tenemos un *ContructorDBUsuario* este método reconstruye las propiedades de los usarios a partir de los argumentos recibidos.

Veamos que nuestra base de datos es un *JSON* que desafortuandamente no entiende de estructuras de datos complejas como puede ser un *Map* o un *Set*, para hacer frente a esta carencia, desglosamos dichas estruturas complejas antes de añadirlas a la base de datos y posteriormente en la recuperación 'reensablemos' dichas piezas para poder definir las estructuras complejas que usamos en nuestras clases. Eso es exactamente lo que se ocnsigue con el método *ContructorDBUsuario*.

Podemos encontrar algunas funciones de utilería como es el caso de *esGrupoAmigo* que nos permite determinar si el usuario pertenece o no a un grupo dado por parámetros.

Cuando deseamos añadir una ruta a un usuario, debemos modificar el historial de rutas del usuarios y como hemos hablado previamente, pretendemos que las claves sean las fechas de realización de la ruta. Para conseguir esto, usamos el módulo *Date*, que nos permite manipular fechas, y saber la fecha actual. La idea se basa en rellenar el formato **dia/mes/año**, posteriomente comprobaremos si esa fecha ya existe, porque en dicho caso debemos modificar el array de rutas de dicho dia añadiendo la nueva ruta. en caso de no existir, creamos una nueva entrada a nuestro *Map* y con su respectiva clave/valor. 

*Es importante tener en cuenta que las acciones que se lleven a cabo en una clase, pueden afectar a otras clases de forma indirecta.* 

Un ejemplo de lo anterior ocurre al añadir una *Ruta*, ya que debemos asegurarnos de actualziar las estadísticas del usuarios, esta acción hará que todos los grupos a los que pertenezca el usuario se vean afectados de forma indirecta, ya que sus estadísticas grupales también cambiarán. Por esto debemos recorrer cada uno de sus grupos actualizandolos.

Respecto a la actualización de estadísiticas antes mencionada, hemos desarrollado un método que nos permite actualizar cada uno de los campos de las estadisticas. Para esto simplemente sumamos a las estadisticas actuales, los valores que aportan la nueva ruta.

El programa permitirá al usuario reliazar acciones de gestión como puede ser la creación y borraod de *Retos y Amigos*. Desarrollamos diferentes funciones que nos permiten modificar nuestras prpiedades según lo vayamos requiriendo.

Algunos de los

#### Ruta






-------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------

#### Grupo

La clase grupo se encarga de reunir en una misma estructura de datos, diferentes usuarios. Esta clase es bastante simple aunque el hecho de tener que almacener muchos usuarios nos pareció una carga innecesaria para la clase, ya que este trabajo debe hacerlo la base de datos, es por esto que en las instancias de grupo solo almacenamos el identificador de los usuarios. Al igual que las clases anteriormente mencionadas, cada instancia de la clase Grupo cuenta con un identificador único, que se asigna gracias a una variable de clase (variable estática _contadorGrupo).

Inicialmente el constructor debe recibir dos atributos, el nombre del grupo, que se selecciona sin restricción alguna, y la ID del creador, esto nos permitirá tener un control a la hora de eliminar grupos, ya que solo el creador de un grupo puede borrar ese mismo grupo. Además, la clase cuenta con muchos atributos que representan funcionalidades o características de esta clase. Entonces podemos nombrar los atributos y su función en la clase: *_estadistica* permite almacenar la información de la estadística del grupo, que se irá actualizando a lo largo de la ejecución del programa; *_clasificacion*, como su propio nombre indica, nos permite saber el ranking de usuarios ordenados por el número de entrenamientos que han realizado, es decir, el número total de kilómetros que han recorrido; *_participantes*, representa la identificación de cada uno de los usuarios del grupo; *historicoRutas*, probablemente este es el atributo más interesante, ya que se encarga de almacenar la información correspondiente a las rutas que han recorrido en grupo, pero se almacena en un Map, esto nos permite almacenar tantas rutas como queramos, en función de la fecha en la que se hayan realizado.

A continuación, lo que encontramos son los getters de la clase, que nos permiten acceder a los atributos de la clase, en esta clase hemos creado getters para los siguientes atributos: 
*id*, *creador*, *nombre*, *participantes*, *historicoRutas*, *estadistica* y *clasificacion*.
 
En cuanto a los métodos, el primero que distinguimos es el método llamado *ConstructorDBGrupo*, este método es una sobrecarga del constructor, y se encarga de crear un grupo a partir de la información que se le pasa por parámetro, es decir, a partir de la información que se encuentra en la base de datos, al igual que ocurre en las otras clases anteriormente mencionadas.

El siguiente método se encarga de agregar un usuario al grupo, *agregarUsuario*, esto lo realiza haciendo un push del usuario pasado por parámetro en el array que representa a los usuarios, pero como explicamos antes, solo reliza un push del ID del mismo, ya la base de datos almacena toda la demás información. Esta función también se encarga de actualizar la información de la estadística, ya que este atributo representa la suma de todos sus integrantes.

Si seguimos avanzando nos encontramos con el siguiente método, *clasificacionUsuarios*, el cual se encarga de devolver el ranking de usuarios ordenados en base a la cantidad de kilómetros que han recorrido, esto lo consigue gracias a ordenar el vector en base al atributo anteriormente mencionado.

A continuación nos encontramos con el método *agregarRuta*, este método se encarga de agregar una ruta conjunta al Map *_historicoRutas*, como se ha acordado en el guión, cuando un grupo organiza hacer una ruta, por simplificación asumimos que todos y cada uno de los miembros del grupo la realizan. Es por esto que el método primero determina la fecha en la que se encuentra y hace una transformación de la fecha a un string, que será la key de nuestro Map. Luego se actualiza el *_historicoRutas* con la ruta que se pasó por parámetro y por último se actualiza cada usuario miembro del grupo, agregando esa misma ruta en su propiedad *_historicoRutas*.

El siguiente método que podremos ver será *rutasFavoritas*, el cual inicialmente se encarga de rescatar todas las rutas del grupo, luego crea un Map que almacena pares de valores ruta - número de veces que se repite esa ruta, a continuación se lleva a cabo la cuenta, finalmente solo queda rescatar las tres rutas favoritas, ordenando el vector en base a los números de repeticiones de cada ruta y sacando los tres primeros elementos.

La función *actualizarEstadistica*, como es de esperar, se encarga de actualizar cada uno de los campos de las estadísticas de los grupos, esto lo realiza fácilmente apoyándose en la clase *ColeccionUsuarios* que explicaremos más adelante. Simplemente hace uso de la función *reduce* para obtener la suma de cada una de las estadísticas por separado y finalmente las reune formando un objeto de tipo *EstadisticaGrupo*.

Y con esto, hemos llegado al final de la clase, al método *toString*, el cual se encarga de devolver una cadena con toda la información referente a un grupo.


#### Reto



### Colecciones

#### Coleccion Usuario

#### Coleccion Ruta

#### Coleccion Grupo

#### Coleccion Reto

### Enumerados


### Interfaces


### Utilidades


### Conclusión


### Bibliografía
