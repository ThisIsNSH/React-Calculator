import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class App extends Component {

  constructor() {
    super()
    this.state = { result: "", calculation: "" }
    this.operations = ['DEL', '+', '-', '/', '*']
  }

  calculateResult() {
    const text = this.state.result
    this.setState({
      calculation: eval(text)
    })
  }

  validate() {
    const text = this.state.result
    switch (text.slice(-1)) {
      case '+':
      case '-':
      case '/':
      case '*':
        return false
    }
    return true
  }

  buttonPressed(text) {
    if (text == '=') {
      return this.validate() && this.calculateResult()
    }
    this.setState({
      result: this.state.result + text
    })
  }

  operate(operation) {
    switch (operation) {
      case 'DEL':
        console.log(this.state.result)
        let text = this.state.result.split('')
        text.pop()
        this.setState({
          result: text.join('')
        })
        break
      case '+':
      case '-':
      case '/':
      case '*':
        const lastChar = this.state.result.split('').pop()
        if (this.operations.indexOf(lastChar) > 0) return
        if (this.state.result == '') return
        this.setState({
          result: this.state.result + operation
        })
    }
  }

  render() {

    let rows = []
    let nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['.', 0, '=']]
    for (let i = 0; i < 4; i++) {
      let row = []
      for (let j = 0; j < 3; j++) {
        row.push(<TouchableOpacity key={nums[i][j]} onPress={() => this.buttonPressed(nums[i][j])} style={styles.btn}><Text style={styles.btnText}>{nums[i][j]}</Text></TouchableOpacity>)
      }
      rows.push(<View key={nums[i]} style={styles.row}>{row}</View>)
    }

    let ops = []
    for (let i = 0; i < 5; i++) {
      ops.push(<TouchableOpacity key={this.operations[i]} onPress={() => this.operate(this.operations[i])} style={styles.btn}><Text style={styles.operationText}>{this.operations[i]}</Text></TouchableOpacity>)
    }

    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.result}</Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>{this.state.calculation}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>
            {rows}
          </View>
          <View style={styles.operations}>
            {ops}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1
  },
  resultText: {
    fontSize: 30,
    marginRight: 16,
    color: '#434343'
  },
  btnText: {
    fontSize: 24
  },
  operationText: {
    fontSize: 24,
    color: 'white'
  },
  calculationText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 16,
    color: '#7D3C98'
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  result: {
    flex: 2,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  calculation: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  buttons: {
    flex: 7,
    flexDirection: 'row'
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  numbers: {
    flex: 3,
    backgroundColor: '#E5E8E8'
  },
  operations: {
    flex: 1,
    backgroundColor: 'black'
  }

});
