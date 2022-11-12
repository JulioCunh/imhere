import { useState } from "react";
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Participant } from "../../components/Participant";
import { styles } from "./styles";

export function Home() {
  const [participants, setPartcipants] = useState<string[]>([]);
  const [participantName, setPartcipantName] = useState('');

  function handleParticipantAdd() {
    if (participants.includes(participantName)) {
      return Alert.alert('Participante existe', 'Já existe um participante com esse nome');
    }
    
    setPartcipants(prevState => [...prevState, participantName])
    setPartcipantName('');
  }

  function handleParticipantRemove(name: string) {
    Alert.alert('Remover', `Remover o participante ${name}?`, [
      {
        text: 'sim',
        onPress: () => setPartcipants(prevState => prevState.filter(participant => participant !== name)),
        },
        {
          text: 'não',
          style: 'cancel'
        }
      
    ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Nome do evento
      </Text>

      <Text style={styles.eventDate}>
        Sexta, 4 de Novembro de 2022.
      </Text>

    <View style={styles.form}>
      <TextInput 
        style={styles.input}
        placeholder="Nome do participante"
        placeholderTextColor="#6b6b6b"
        onChangeText={setPartcipantName}
        value={participantName}
      />

    < TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
      <Text style={styles.buttonText}>
        +
      </Text>
    </TouchableOpacity>
    </View>

    <FlatList 
    data={participants}
    keyExtractor={item => item}
    renderItem={({ item }) => (
      <Participant
      key={item}
      name={item}
    onRemove={() => handleParticipantRemove(item)}
    />
    )}
    showsVerticalScrollIndicator={false}
    ListEmptyComponent={() => (
      <Text style={styles.ListEmptyText}>
        Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.
      </Text>
    )}

    />

    </View>
  )
}