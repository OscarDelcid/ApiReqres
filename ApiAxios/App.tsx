import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  InteractionManager,
  NativeModules,
  Image,
  ImageBackground,
} from 'react-native';

const BASE_URL = 'https://reqres.in/';

const App = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const names = 'Juanita';
  const jobs = 'Sabritas';
  const [dataPost, setDataPost] = useState('');
  const [dataPut, setDataPut] = useState('');
  const [dataDelete, setDataDelete] = useState('');

  useEffect(() => {
    axios
      .get('https://reqres.in/api/users?page=2')
      .then(({data}) => {
        setData(data.data);
      })
      .catch(({error}) => console.log(error))
      .finally(() => setLoading(false));

    axios
      .post('https://reqres.in/api/users', {name: names, job: jobs})
      .then(({data}) => {
        setDataPost(
          `Cuenta Creada: Nombre: ${data.name}, Trabajo: ${data.job}, Creación: ${data.createdAt}, ${data.id}`,
        );
      })
      .then(() => {
        console.log(dataPost);
      });

    axios
      .put('https://reqres.in/api/users/2', {name: 'Joel', job: 'McDunals'})
      .then(({data}) => {
        setDataPut(
          `Cuenta Actualizada: Nombre:${data.name}, Trabajo: ${data.job}, Actualizacion: ${data.updatedAt}`,
        );
      });

    axios.delete('https://reqres.in/api/users/2').then(() => {
      setDataDelete(`Cuenta eliminada`);
    });
  }, []);

  return (
    <View style={styles.color}>
      <View style={styles.containerTex}>
        <Text>GET</Text>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <Text style={styles.container}>
              Id: {item.id}, Nombre: {item.first_name}, Apellido:{' '}
              {item.last_name}, Email: {item.email}
            </Text>
          )}
        />
      </View>

      <View style={styles.containerTex}>
        <Text>Post</Text>
        <Text>{dataPost}</Text>
      </View>

      <View style={styles.containerTex}>
        <Text>Put</Text>
        <Text>{dataPut}</Text>
      </View>

      <View style={styles.containerTex}>
        <View>
          <Text>Delete</Text>
          <Text>{dataDelete}</Text>
        </View>
      </View>
    </View>
  );
};

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  containerTex: {
    margin: 10,
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
  },

  container: {
    margin: 10,
    alignItems: 'center',
    borderColor: '#242BFF',
    borderWidth: 1,
  },
  color: {
    flex: 1,
    backgroundColor:'#D1FFDC'
  },
});

export default App;
