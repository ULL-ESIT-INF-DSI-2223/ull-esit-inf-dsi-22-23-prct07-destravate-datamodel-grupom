# Práctica 7 : DeStravaTe
## Por Daniel Felipe Gómez Aristizabal y Facundo José García Gallo


[![Tests](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct07-destravate-datamodel-grupom/actions/workflows/node.js.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct07-destravate-datamodel-grupom/actions/workflows/node.js.yml)

[![Coveralls](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct07-destravate-datamodel-grupom/actions/workflows/coveralls.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct07-destravate-datamodel-grupom/actions/workflows/coveralls.yml)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2223_ull-esit-inf-dsi-22-23-prct07-destravate-datamodel-grupom&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2223_ull-esit-inf-dsi-22-23-prct07-destravate-datamodel-grupom)


### Índice

1. [Introducción](#introducción)

    1.1. [Hablemos de Test](#hablemos-de-test)

    1.2. [Hablemos de LowDB](#hablemos-de-lowdb)

    1.3. [Hablemos de Inquirer](#hablemos-de-inquirer)

2. [Entidades](#entidades)
    
    2.1. [Usuario](#usuario)

    2.2. [Ruta](#ruta)

    2.3. [Grupo](#grupo)

    2.4. [Reto](#reto)

3. [Colecciones](#colecciones)

    3.1. [Singleton el patrón de ahorro](#singleton-el-patrón-de-ahorro)

    3.2. [Coleccion Usuario](#coleccion-usuario)

    3.3. [Coleccion Ruta](#coleccion-ruta)

    3.4. [Coleccion Grupo](#coleccion-grupo)
    
    3.5. [Coleccion Reto](#coleccion-reto)

4. [Utilidades](#utilidades)

    4.1. [Gestor](#gestor)
    
    4.2. [ManejadorJSON](#manejadorjson)

5. [Enumerados](#enumerados)

6. [Interfaces](#interfaces)

7. [Tipos](#tipos)

8. [Conclusión](#conclusión)

9. [Bibliografía](#bibliografía)


### Introducción

Para la realización de la práctica se nos pide la implementación de un esqueleto de clases que representan las entidades de una aplicación de deporte. Para ello tenemos que hacer uso de un gestor de bases de datos como puede ser LowDB y un gestor de entrada como puede ser Inquirer. Es por esto que antes de comenzar a desarrollar, debimos investigar sobre estos dos gestores. 

Luego de conocer un poco mejor el entorno, debimos ponernos de acuerdo para elegir la mejor estructura del código, para esto nos basamos en el patrón de diseño Singleton, el cual nos permitió ahorrar memoria y tiempo de ejecución. 


#### Hablemos de Test

A la hora de desarrollar un programa, es difícil llevar todo al mismo tiempo, inicialmente nos hicimos un boceto que permitía determinar las relaciones que existían entre entidades, pero a medida que el programa creció, necesitamos muchas nuevas funcionalidades y esto complica el desarrollo de test, quizás también por el absurdo afán que se tiene por avanzar, cuando al final tendrán que hacer todo.

Sin embargo, todo se ha probado, bueno... Casi todo. Lamentablemente no hemos realizado pruebas para las clases colecciones, ya que debido a la implementación del patrón Singleton, estas se modificaban a medida que el programa se probará llegando siempre a obligarnos a modificar las pruebas. Al final optamos por no probarlas directamente, aunque su funcionamiento está comprobado al usarla en la recuperación de las bases de datos y el desarrollo de distintos métodos de búsqueda y ordenamiento.


#### Hablemos de LowDB

LowDB es una librería que nos permite crear bases de datos en formato JSON, la cual nos permite guardar y recuperar datos de forma sencilla. En nuestro caso, hemos decidido dividir los datos, creando cuatro bases de datos, una para cada entidad. En cada una de ellas se guarda información de las colecciones de cada una de las entidades.


#### Hablemos de Inquirer

Inquirer es una librería que nos permite crear interfaces de usuario de forma sencilla, la cual nos permite crear menús de opciones, preguntas y respuestas. En nuestro caso, hemos decidido usarla para crear un menú de opciones que permita al usuario interactuar con la aplicación, todo en la clase Gestor.


### Entidades

El programa esta compuesto por cuatro entidades principales, las cuales hemos modelado a partir de cuatro clases. Dichas clases siguen los requisitos propuestos en el guion de la práctica. A continuación describiremos cada uno de ellos de forma detallada, explicando el funcionamiento y las decisiones de diseño que hemos tomado.


#### Usuario

La clase Usuario como su nombre indica modela el comportamiento de nuestras instancias de *Usuario* se pretende entonces agregar todas las propiedades que permitan describir su comportamiento.

La clase cuenta con una propiedad privada y estática *_contadorUsuario* que permite de forma secuencial definir un *_id* único para cada usuario que permite identificar de forma única en toda la Base de Datos a cada usuario, este contador se consigue de ir incrementando el contador de usuarios.

Los usuarios podrán realizar *Actividades*, estas actividades son montar en bicicleta o correr. Debido a que deseábamos evitar que por algún motivo se añada más de uan vez alguna de las actividades mencionadas, definimos el atributo *_actividades* como una propiedad privada de tipo *Set<Actividades>*.

(Para más información de *Actividades* véase [Enumerados](#enumerados))

Un usuario podrá hacer *Rutas* y deseamos saber cuando las ha realizado. Teniendo en cuenta que se podría realizar más de una ruta al día, hemos considerado que un *Map<string, number[]>* sería perfecto. La idea es guardar como clave el día que el usuario realiza una ruta. Por otro lado nuestro valor será un *array* de números que permiten almacenar los *id's* de las *Rutas* realizadas. 

Veamos que lo anterior nos proporciona grandes ventajas, por ejemplo ahora podemos determinar de forma sencilla las rutas que a realizado el usuario en **x** día.

Otra característica importante de un usuario son sus estadísticas, estas deseamos que sean calculadas en base a la semana, mes y año. Para conseguir esto hemos definido un *type* el cual se explicará más adelante. (Véase [Tipos](#tipos))

Los usuarios podrán ser amigos de otros usuarios, para esto registraremos sus amigos en un arreglo de números *_amigos*, donde se guardarán los *îd's* de los amigos. Algo Similar se hará con los grupos, un usuario podrá pertenecer a grupos y para presenciar a cuales pertenece, lo almacenaremos en una propiedad *_gruposAmigos* que es un array de números.

Finalmente, podrán hacer parte de *Retos*, los cuales estarán almacenados como *id's* en *_retosActivos*.

El Constructor de la clase es realmente sencillo, define mediante los parámetros el nombre del usuario y el array de actividades que realiza.

Luego simplemente haremos uso de la técnica que comentamos con la variable de clase *_contadorUsuario* para definir un *id* único a dicho usuario.

Como hemos visto anteriormente, todas nuestras propiedades son *private*, sin embargo, necesitamos hacer uso de sus valores en ocasiones, es por esto que definimos *getters* para rodas las propiedades.

Debemos tener presente siempre que este programa tendrá persistencia en memoria y esto significa que debemos estar preparados para recuperar datos que se han guardado de sesiones previas. Para esto nos apoyamos en clases que hablaremos más adelante como es el caso de ManejadorJSON o ColeccionUsuarios. De momento lo que debemos tener presente es que tenemos un *ContructorDBUsuario* este método reconstruye las propiedades de los usuarios a partir de los argumentos recibidos.

Veamos que nuestra base de datos es un *JSON* que desafortunadamente no entiende de estructuras de datos complejas como puede ser un *Map* o un *Set*, para hacer frente a esta carencia, desglosamos dichas estructuras complejas antes de añadirlas a la base de datos y posteriormente en la recuperación 'volver a montar' dichas piezas para poder definir las estructuras complejas que usamos en nuestras clases. Eso es exactamente lo que se consigue con el método *ContructorDBUsuario*.

Podemos encontrar algunos métodos útiles como es el caso de *esGrupoAmigo* que nos permite determinar si el usuario pertenece o no a un grupo dado por parámetros.

Cuando deseamos añadir una ruta a un usuario, debemos modificar el historial de rutas del usuarios y como hemos hablado previamente, pretendemos que las claves sean las fechas de realización de la ruta. Para conseguir esto, usamos el módulo *Date*, que nos permite manipular fechas, y saber la fecha actual. La idea se basa en rellenar el formato **dia/mes/año**, posteriormente comprobaremos si esa fecha ya existe, porque en dicho caso debemos modificar el array de rutas de dicho dia añadiendo la nueva ruta. en caso de no existir, creamos una nueva entrada a nuestro *Map* y con su respectiva clave/valor. 

*Es importante tener en cuenta que las acciones que se lleven a cabo en una clase, pueden afectar a otras clases de forma indirecta.* 

Un ejemplo de lo anterior ocurre al añadir una *Ruta*, ya que debemos asegurarnos de actualizar las estadísticas del usuarios, esta acción hará que todos los grupos a los que pertenezca el usuario se vean afectados de forma indirecta, ya que sus estadísticas grupales también cambiarán. Por esto debemos recorrer cada uno de sus grupos actualizándolos.

Respecto a la actualización de estadísticas antes mencionada, hemos desarrollado un método que nos permite actualizar cada uno de los campos de las estadísticas. Para esto simplemente sumamos a las estadísticas actuales, los valores que aportan la nueva ruta.

El programa permitirá al usuario realizar acciones de gestión como puede ser la creación y borrado de *Retos y Amigos*. Desarrollamos diferentes funciones que nos permiten modificar nuestras propiedades según lo vayamos requiriendo.

Algunos de los requisitos de la práctica para la clase *Usuarios* hemos decidido desarrollarlos a través de métodos en lugar de propiedades, esto se debe a que son propiedades muy cambiantes en el tiempo y que dependen directamente de otras propiedades, siendo mejor calcularlas cada vez que se requieran, ya que siempre se tendrá el dato actualizado sin abusar de memoria. 

Lo anterior hace presencia en el método *rutasFavoritas* y la *distanciaTotal*. Datos que son fáciles de calcular a partir de las demás propiedades.

Finalmente, encontramos el método *toString* que nos permite poder definir un formato de impresión a la hora de convertir nuestros objetos *Usuario*, como por ejemplo al invocarlos con ${usu1}.

#### Ruta

Para modelar una *Ruta* debemos tener presente que necesitaremos algunos atributos ya mencionados en la clase *Usuario*. Un ejemplo de esto es el *_id* el cual sigue la misma lógica antes planteada, apoyándose de la variable de clase *_contadorRuta*.

Nuestra *Ruta* tendrá un *array* *_usuarios* donde se almacenarán todos los *id's* de los integrantes de la Ruta. Además tendremos una calificación que será dado por los usuarios.

Además, es importante destacar que las rutas cuentan con propiedades de localización como *_geolocalizacionInicial* y *_geolocalizacionFinal*. Propiedades de tipo *Coordenadas* que se describirán más adelante.

Finalmente, sabemos que una *Ruta* debe tener una *_distancia* y un *_desnivel*, que será recorrido de una determinada forma, por tanto también contará con *_tipoActividad*.

Como ya mencionamos Anteriormente, pretendemos trabajar con persistencia en memoria, por tanto debemos recuperar los datos del usuarios de forma correcta, para esto nos apoyamos del *ConstructorDBRuta*.

Otro método interesante de destacar es *calificar* que no permite limitar la forma de calificar de un *Usuario* frente a la *Ruta*.

Para permitir la interacción de Usuarios con entidades, añadimos los métodos *agregarUsuario* y *eliminarUsuario*, que como sus nombres indican, sirven para añadir y eliminar a un usuario de nuestra lista de usuarios.

Finalmente, incluimos nuestro método *toString* que nos permite definir el formato de conversión a *String* para nuestro objeto, función interesante para las llamadas del tipo ${ruta1}.


#### Grupo

La clase grupo se encarga de reunir en una misma estructura de datos, diferentes usuarios. Esta clase es bastante simple aunque el hecho de tener que almacenar muchos usuarios nos pareció una carga innecesaria para la clase, ya que este trabajo debe hacerlo la base de datos, es por esto que en las instancias de grupo solo almacenamos el identificador de los usuarios. Al igual que las clases anteriormente mencionadas, cada instancia de la clase Grupo cuenta con un identificador único, que se asigna gracias a una variable de clase (variable estática _contadorGrupo).

Inicialmente el constructor debe recibir dos atributos, el nombre del grupo, que se selecciona sin restricción alguna, y la ID del creador, esto nos permitirá tener un control a la hora de eliminar grupos, ya que solo el creador de un grupo puede borrar ese mismo grupo. Además, la clase cuenta con muchos atributos que representan funcionalidades o características de esta clase. Entonces podemos nombrar los atributos y su función en la clase: *_estadistica* permite almacenar la información de la estadística del grupo, que se irá actualizando a lo largo de la ejecución del programa; *_clasificacion*, como su propio nombre indica, nos permite saber el ranking de usuarios ordenados por el número de entrenamientos que han realizado, es decir, el número total de kilómetros que han recorrido; *_participantes*, representa la identificación de cada uno de los usuarios del grupo; *historicoRutas*, probablemente este es el atributo más interesante, ya que se encarga de almacenar la información correspondiente a las rutas que han recorrido en grupo, pero se almacena en un Map, esto nos permite almacenar tantas rutas como queramos, en función de la fecha en la que se hayan realizado.

A continuación, lo que encontramos son los getters de la clase, que nos permiten acceder a los atributos de la clase, en esta clase hemos creado getters para los siguientes atributos: 
*id*, *creador*, *nombre*, *participantes*, *historicoRutas*, *estadistica* y *clasificacion*.
 
En cuanto a los métodos, el primero que distinguimos es el método llamado *ConstructorDBGrupo*, este método es una sobrecarga del constructor, y se encarga de crear un grupo a partir de la información que se le pasa por parámetro, es decir, a partir de la información que se encuentra en la base de datos, al igual que ocurre en las otras clases anteriormente mencionadas.

El siguiente método se encarga de agregar un usuario al grupo, *agregarUsuario*, esto lo realiza haciendo un push del usuario pasado por parámetro en el array que representa a los usuarios, pero como explicamos antes, solo realiza un push del ID del mismo, ya la base de datos almacena toda la demás información. Esta función también se encarga de actualizar la información de la estadística, ya que este atributo representa la suma de todos sus integrantes.

Si seguimos avanzando nos encontramos con el siguiente método, *clasificacionUsuarios*, el cual se encarga de devolver el ranking de usuarios ordenados en base a la cantidad de kilómetros que han recorrido, esto lo consigue gracias a ordenar el vector en base al atributo anteriormente mencionado.

A continuación nos encontramos con el método *agregarRuta*, este método se encarga de agregar una ruta conjunta al Map *_historicoRutas*, como se ha acordado en el guion, cuando un grupo organiza hacer una ruta, por simplificación asumimos que todos y cada uno de los miembros del grupo la realizan. Es por esto que el método primero determina la fecha en la que se encuentra y hace una transformación de la fecha a un string, que será la key de nuestro Map. Luego se actualiza el *_historicoRutas* con la ruta que se pasó por parámetro y por último se actualiza cada usuario miembro del grupo, agregando esa misma ruta en su propiedad *_historicoRutas*.

El siguiente método que podremos ver será *rutasFavoritas*, el cual inicialmente se encarga de rescatar todas las rutas del grupo, luego crea un Map que almacena pares de valores ruta - número de veces que se repite esa ruta, a continuación se lleva a cabo la cuenta, finalmente solo queda rescatar las tres rutas favoritas, ordenando el vector en base a los números de repeticiones de cada ruta y sacando los tres primeros elementos.

La función *actualizarEstadistica*, como es de esperar, se encarga de actualizar cada uno de los campos de las estadísticas de los grupos, esto lo realiza fácilmente apoyándose en la clase *ColeccionUsuarios* que explicaremos más adelante. Simplemente hace uso de la función *reduce* para obtener la suma de cada una de las estadísticas por separado y finalmente las reúne formando un objeto de tipo *EstadisticaGrupo*.

Y con esto, hemos llegado al final de la clase, al método *toString*, el cual se encarga de devolver una cadena con toda la información referente a un grupo.


#### Reto

Los *Retos* están conformados por una serie de *Rutas* *_rutas*, que determinados *Usuarios* *_usuarios* pretenden recorrer. Evidentemente podemos determinar una distancia total *_distanciaTotal* que se calcula de la suma de cada distancia individual de las *Rutas* que componen al *Reto*. Además, esta distancia se pretende recorrer de una forma en concreto, por lo que podemos definir un *_tipoActividad* del *Reto*.

Finalmente, debemos tener los demás elementos básicos que incluyen las clases restantes como son el  identificador único de la instancia *_id*, calculado a partir de la variable de clase *_contadorReto*. Además el reto contará con un nombre *_nombre*.

Incluimos todos los *getters* correspondientes a las propiedades antes mencionadas.

Además incluiremos métodos de control de las propiedades como es el caso de *agregarUsuario* y *quitarUsuario*, que como sus nombres indican, nos permiten agregar y eliminar usuarios que participan en el *Reto*.

Finalmente, como ya pasaba con las otras entidades mencionadas incluimos el método *toString*, que nos permite definir el formato de conversión a *String*, para nuestro objeto. Función interesante para las llamadas del tipo ${reto1}.


### Colecciones

Una vez definidas las entidades que intervienen en nuestro programa, es interesante ver como trabajar con ellas de forma conjunta y relacionándolas. Tengamos presente entonces que deseamos trabajar con uan serie de *Usuarios* que pueden estar relacionados entre ellos en *Grupos*. Además podemos ver como los *Retos* se componen de *Rutas*. A su vez, los *Usuarios* pueden realizar *Rutas*, e incluso los *Grupos* realizan dichas *Rutas*. En definitiva nos encontramos frente a un programa que necesita de varias instancias de las entidades mencionadas y manipular estos datos puede llegar a ser complicado si hacemos solo uso de una estructura de datos que nos ofrezca el lenguaje. 

Es por esto que hemos decidido hacer colecciones de entidades, que agrupan a las entidades y permiten desarrollar diferentes operaciones sobre las mismas.

#### Singleton el patrón de ahorro

Tras meditar un rato llegamos a la conclusión que necesitábamos desarrollar las clases colección, pero nos daba miedo el hecho de desarrollar una colección de elementos, ya que podrían obligarnos a tener datos duplicados en partes de l código y siempre deberíamos pasar una colección a determinadas funciones. Esto nos llevo a plantearnos hacer las colecciones como clases Singleton, el resultado sería ahorrar espacio, ganar en flexibilidad, entre otras ventajas.

En definitiva consideramos que la inclusión de este patrón de diseño es de las mejores decisiones que tomamos. Gracias a tener una sola instancia, siempre sin importar en que parte del código estemos, accedemos a la misma información de forma centralizada.

A continuación pasaremos a describir más a fondo el comportamiento de cada una de estas clases.

#### Coleccion Usuario

Primeramente tengamos presente lo que vimos antes, hemos desarrollado la estructura de una clase Singleton, contamos con una colección de *Usuario* privada, con una variable de clase privada y estática *coleccionUsuarios* que almacena la única instancia de la clase. 

Además contamos con el constructor privado, para impedir las llamadas desde fuera de la clase, ya que la creación de la única instancia se hace a partir del método público estático *getColeccionUsuarios* que en caso de ser la primera vez que se llame, crea la instancia y la retorna, en llamadas posteriores simplemente se retorna la instancia almacenada en la variable de clase.

En cuanto a los métodos, encontramos métodos como *getNumeroUsuarios* que como su nombre indica, retorna el número de usuarios en la colección. 

Contamos además con métodos que nos devuelven elementos de la colección como, *getUsuarios* que devuelve la colección entera o *getUsuario* que nos da un usuario determinado según un *id* dado por parámetros.

También podemos conseguir información del conjunto de *Usuario* como las estadísticas de un determinado usuario dado su *id*.

Para simplificar la manipulación de la colección hemos añadido métodos de manejo de la clase, como *agregarUsuario* y *eliminarUsuario* que como sus nombres indican agregan y eliminan a un usuario de la colección.

De cara a la gestión de la base de datos y la depuración, hemos añadido el método *imprimirInformacion* que permite imprimir a cada usuario que conforma la colección.

Además, para satisfacer la solicitud propuesta en el guion de la práctica de tener determinados métodos de ordenamiento de la información, hemos desarrollado uan serie de métodos que ordenan según:

- ordenarAlfabeticamente

- ordenarId

- ordenarDistanciaSemana

- ordenarDistanciaMes

- ordenarDistanciaAnio

- ordenarNumeroRutas

Estos métodos a su vez se pueden ordenar de manera ascendente y descendente, para evitar crear los mismos métodos con la lógica inversa, hemos decidido incluir en sus parámetros la opción de ordenar. De esta forma mediante la instrucción ManeraOrdenar.Ascendente o ManeraOrdenar.Descendente, podemos definir el tipo de ordenamiento, donde siempre se ordena de uan forma **x** y se invierte con el método *.reverse* si se requiere por parámetros.

#### Coleccion Ruta

Veamos entonces que la idea de Singleton también se aplica para la *ColeccionRuta*.

Destacar que también se han incluido los métodos que favorecen la manipulación de la colección como son *getRutas* y *getRuta*, funcionando del mismo modo que veíamos en la clase anterior.

De la misma forma, hemos incluido los métodos *agregarRuta* y *eliminarRuta* e *imprimirInformacion*.

Finalmente, procedemos de la misma forma que lo hemos hecho antes en cuanto a los métodos de ordenamiento de la colección, en este caso encontramos los siguientes:

- ordenarAlfabeticamente

- ordenarId

- ordenarCantidadUsuarios

- ordenarDistancia

- ordenarActividad

- ordenarCalificacionMedia

#### Coleccion Grupo

Veamos entonces que la idea de Singleton también se aplica para la *ColeccionGrupos*.

También se han incluido los métodos que favorecen la manipulación de la colección como son *getGrupos* y *getGrupo*, funcionando del mismo modo que veíamos en la clase anterior.

De la misma forma, hemos incluido los métodos *agregarGrupo* y *eliminarGrupo* e *imprimirInformacion*.

Finalmente, procedemos de la misma forma que lo hemos hecho antes en cuanto a los métodos de ordenamiento de la colección, en este caso encontramos los siguientes:

- ordenarAlfabeticamente

- ordenarId

- ordenarCantidadUsuarios

- ordenarDistancia

- ordenarActividad

- ordenarCalificacionMedia


#### Coleccion Reto

Veamos entonces que la idea de Singleton también se aplica para la *ColeccionRetos*.

También se han incluido los métodos que favorecen la manipulación de la colección como son *getRetos* y *getReto*, funcionando del mismo modo que veíamos en la clase anterior.

De la misma forma, hemos incluido los métodos *agregarReto* y *eliminarReto* e *imprimirInformacion*.

Finalmente, procedemos de la misma forma que lo hemos hecho antes en cuanto a los métodos de ordenamiento de la colección, en este caso encontramos los siguientes:

- ordenarAlfabeticamente

- ordenarId

- ordenarCantidadUsuarios

- ordenarDistancia

- ordenarActividad

- ordenarCalificacionMedia


### Utilidades

Para la correcta implementación de la práctica tuvimos que hacer uso de unas clases que permiten la correcta manipulación de los datos en la base de datos y el correcto flujo de eventos del programa principal, es por esto que ahora pasaremos a explicar brevemente las dos clases encargadas de ello.


#### Gestor

La clase Gestor es el constructor de un rompecabezas, a lo largo del presente informe llevamos describiendo como desarrollamos cada una de las piezas y en esta clase nos hemos encargado de secuenciar las llamadas para definir cada uno de los posibles flujos de ejecución.

En esta clase hemos definido diferentes funciones que describen prompts del *inquirer* y luego hemos llamada a cada función dentro de los *.then* para conseguir el resultado deseado. 

Básicamente, hemos desarrollado un método inicio que preguntará al usuario si desea iniciar sesión o se quiere registrar. Lógicamente esto no es logueo muy real, pues no existe ninguna barrera de seguridad. Posteriormente se manda a llamar al método principal. 

Dentro del método principal Preguntaremos al usuario que desea realizar, para este punto ya tenemos un identificador que nos permite determinar quien está ejecutando el programa. 

Según el flujo que el usuario tome al elegir las opciones se llamaran a distintos métodos, asi que destacaremos las opciones que se pueden llevar a cabo.


- verListaUsuarios

- verListaRutas

- verListaGrupos

- verListaRetos

- OrdenarListaUsuarios

- OrdenarListaRutas

- OrdenarListaGrupo

- OrdenarListaRetos

- agregarAmigo

- eliminarAmigo

- unirseGrupo

- crearGrupo

- eliminarGrupo

- crearReto

- crearRuta

- eliminarReto

- eliminarRuta



#### ManejadorJSON

La clase ManejadorJSON se encarga de toda la manipulación de las bases de datos, es decir, de leer y escribir en los archivos JSON. Decidimos implementar esta clase evitando cualquier creación de instancia de la misma, de este modo, esta clase solo trabaja con métodos estáticos.

La estructura es básica, para cada colección existen diversas funciones que la manipulan. Por ejemplo, para la colección de usuarios, tenemos las siguientes funciones: *actualizarUsuariosDB*, *agregarUsuarioDB* y *extraccionUsuariosDB*. La primera de ellas se encarga de actualizar el conjunto de usuarios en la base de datos gracias al uso de la segunda función, que agrega un usuario a la base de datos. La última función simplemente extrae los usuarios de la base de datos y los devuelve en un arreglo de objetos, el cual será gestionado por la clase ColeccionUsuarios.

Para las demás colecciones se aplica la misma lógica, por lo que no se detallarán más.


### Enumerados

Para la correcta estructuración del código hemos decidido implementar una serie de enumerados, como por ejemplo *Actividades* el cual permite acotar las distintas posibilidades que las Rutas (por ejemplo) pueden tomar, en este caso, Correr y Bicicleta.

Por otra parte, creamos un enumerado para determinar la manera en la que se ordenan las colecciones, *ManeraOrdenar*, que puede ser Ascendente y Descendente.

Para cada una de las clases entidades se creó un enumerado que acota las posibles opciones que puede tomar como criterio de ordenación, por ejemplo, *OrdenarRuta* puede ser alfabéticamente, por cantidad de usuarios, por distancia, etc. Lo mismo ocurre con *OrdenarUsuario*, *OrdenarGrupo* y *OrdenarReto*.

Por último se agregaron dos enumerado para controlar las opciones que se pueden ejecutar en el programa principal, como son *ComandosInicio* y *ComandoPrincipal* 

### Interfaces

En cuanto a las interfaces no hay mucho que decir, simplemente se han implementado las necesarias para que las bases de datos cumplan con un contrato, es decir, que cumplan con un diseño que permita que la clase ManejadorJSON pueda manipularlas sin problema.

Por ejemplo para la clase ColeccionUsuarios, se implementó la interfaz *interfazUsuarioDB*, la cual contiene la propiedad *usuarios*, que es de tipo *UsuarioDB[]*, esto quiere decir que todos los elementos que se inserten en la base de datos deben tener esta forma, para luego poder rescatarlos de la misma sin ningún problema.

Con las demás colecciones se ha hecho lo mismo, por lo que no se detallarán más.


### Conclusión

Ingeniería Informática es toda una experiencia, muchas veces salimos de clase de ver temas interesantes, de aprender el por qué de algo que llevamos haciendo todo el tiempo, de ver una nueva forma de pensar o incluso de cosas tan simples pero sorprendentes como hacer un programa interactivo. El grado de importancia que le damos a los proyectos viene desde nuestro propio interés por aprender y esa curiosidad el motor de las grandes cosas. 

El proyecto grupal era sin duda una de esas prácticas que cuando te la mencionan estás impaciente por poder hacerle frente y demostrar todo lo que sabes. Al comenzarla teníamos bastante energía e interés por hacerla lo mejor posible. Lo hemos hablado mucho y consideramos que es posiblemente la práctica más relevante de nuestra carrera hasta la fecha y no porque esté muy bien o por el tiempo dedicado, es mucho más que eso. Esta práctica nos ha llevado a investigar distintas herramientas, nos ha permitido implementar técnicas nuevas como los patrones de diseño, la programación funcional, conceptos de base de datos, entre muchas otras. 

Estamos orgullosos del resultado final de la práctica aunque sinceramente consideramos que el tiempo no era suficiente, consideramos que si se nos brindaran unos días más, podríamos hacer muchas otras funcionalidades a nuestro programa. Sin embargo, sabemos que dedicar más tiempo a la práctica nos repercutiría en otras asignaturas.

En definitiva la práctica nos ha permitido reflejar muchos conocimientos adquiridos y ha sido toda una experiencia de trabajo en equipo que se aprecia, ya que se acerca cada vez más a lo que se ve en un entorno laboral. Solo destacar nuevamente el esfuerzo que requiere la práctica, hemos calculado una media de más de 35 horas requeridas para el trabajo, tiempo que para distribuir en dos semanas es bastante complicado. Esperamos la próxima práctica con muchas ganas.


### Bibliografía

[Patrón singleton](https://refactoring.guru/es/design-patterns/singleton)

[Ejemplos de utilización del módulo Inquirer](https://snyk.io/advisor/npm-package/inquirer/example)

[Ejemplo de utilización del módulo LowDB](https://stackoverflow.com/questions/52063654/how-to-create-lowdb-in-typescriptmain-ts-angular)