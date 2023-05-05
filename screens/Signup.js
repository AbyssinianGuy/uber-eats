import { Text, TextInput, View, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native'
import { useState } from 'react'
import LottieView from 'lottie-react-native'
import { StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import * as Device from 'expo-device'

const deviceType = Device.deviceName === 'iPad' ? "Tablet" : "Phone"

const styles = StyleSheet.create({
    datePickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: deviceType === 'Tablet' ? 80 : 10,
        marginLeft: deviceType === 'Tablet' ? 0 : 10,
    },
    picker: {
        height: -20,
        width: deviceType === 'Tablet' ? 150 : 85,
        marginHorizontal: deviceType === 'Tablet' ? 10 : 5,
        marginRight: 0,
    },
    picker_year: {
        height: -20,
        width: deviceType === 'Tablet' ? 150 : 110,
        marginHorizontal: deviceType === 'Tablet' ? 10 : 5,
    },
});

function DatePicker({ month, day, year, onMonthChange, onDayChange, onYearChange }) {
    const generateNumberOptions = (start, end) => {
        return Array.from({ length: end - start + 1 }, (_, i) => i + start);
    };

    const months = generateNumberOptions(1, 12);
    const days = generateNumberOptions(1, 31);
    const currentYear = new Date().getFullYear();
    const years = generateNumberOptions(currentYear - 90, currentYear - 16);

    return (
        <View style={styles.datePickerContainer}>
            <Text style={{ fontSize: deviceType === 'Tablet' ? 28 : 15, fontWeight: 'bold', marginRight: 0 }}>Date of Birth:</Text>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: -50,
                height: -20

            }}>
                <View style={{
                    marginRight: -5
                }}>
                    <Picker
                        selectedValue={month}
                        style={styles.picker}
                        onValueChange={(itemValue) => onMonthChange(itemValue)}
                    >
                        {months.map((month) => (
                            <Picker.Item key={month} label={month.toString()} value={month} />
                        ))}
                    </Picker>
                </View>
                <View >
                    <Picker
                        selectedValue={day}
                        style={styles.picker}
                        onValueChange={(itemValue) => onDayChange(itemValue)}
                    >
                        {days.map((day) => (
                            <Picker.Item key={day} label={day.toString()} value={day} />
                        ))}
                    </Picker>
                </View>
                <View>
                    <Picker
                        selectedValue={year}
                        style={{ ...styles.picker_year, marginRight: 0 }}
                        onValueChange={(itemValue) => onYearChange(itemValue)}
                    >
                        {years.map((year) => (
                            <Picker.Item key={year} label={year.toString()} value={year} />
                        ))}
                    </Picker>
                </View>
            </View>
        </View>
    );
}

function LabelledInput({ label, value, onChangeText, keyboardType, secureTextEntry, placeholder, password = ['', '1'] }) {
    const styles = StyleSheet.create({
        container: {
            marginBottom: 10,
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: "row"
        },
        text: {
            fontSize: deviceType === 'Tablet' ? 28 : 15,
            fontWeight: "bold",
            textAlign: "center",
        },
        input: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            borderRadius: 5,
            width: 200,
            textAlign: "center",
        },
        input_error: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            borderRadius: 5,
            width: 200,
            textAlign: "center",
            borderColor: "red"
        }
    });

    const validateName = (name) => {
        // check if name contains only alphabets and length is greater than 4
        return /^[a-zA-Z]+$/.test(name) && name.length >= 3
    }

    const validateEmail = (email) => {
        // check if email is valid
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    const validatePassword = (password) => {
        const hasUppercase = /[A-Z]/.test(password);
        const hasSymbol = /[!@#$%^&*]/.test(password);
        const hasNumber = /[0-9]/.test(password);

        return hasUppercase && hasSymbol && hasNumber;
    };

    const validateConfirmPassword = (password, confirmPassword) => {
        return password === confirmPassword
    }

    const toVerify = (label, value) => {
        switch (label) {
            case "Name:":
                return validateName(value)
            case "Email:":
                return validateEmail(value)
            case "Password:":
                return validatePassword(value)
            case "Confirm Password:":
                return validateConfirmPassword(password[0], password[1])
            default:
                return false
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{label}</Text>
            <TextInput
                style={toVerify(label, value) ? styles.input : styles.input_error}
                placeholder={placeholder}
                placeholderTextColor={'#aaaaaa'}
                // style={styles.input}
                onChangeText={onChangeText}
                value={value}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
            />
        </View>
    )
}


export default function Signup({ navigation }) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [month, setMonth] = useState(1);
    const [day, setDay] = useState(1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState(' ') // to avoid error on first render




    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{
                backgroundColor: "#eee",
                justifyContent: "center",
                flexDirection: "column",
            }}
        >

            <LottieView
                style={{ height: 200, alignSelf: "center", marginBottom: 30, backgroundColor: "#ddd", borderRadius: 100 }}
                source={require("../assets/animations/signup.json")}
                autoPlay
                speed={0.5}
                loop={true}
            />
            {/* the text and textInput should be on the same line */}

            <LabelledInput
                label="Name:"
                value={name}
                placeholder='John Doe'
                onChangeText={text => setName(text)}
            />
            <LabelledInput
                label="Email:"
                value={email}
                placeholder='email@example.com'
                onChangeText={text => setEmail(text)}
                keyboardType="email-address"
            />
            <DatePicker
                month={month}
                day={day}
                year={year}
                onMonthChange={(value) => setMonth(value)}
                onDayChange={(value) => setDay(value)}
                onYearChange={(value) => setYear(value)}
            />
            <LabelledInput
                label="Password:"
                value={password}
                onChangeText={text => setPassword(text)}
                keyboardType="default"
                placeholder='iMhungry@123'
                secureTextEntry={true}

            />
            <LabelledInput
                label="Confirm Password:"
                value={confirmPassword}
                onChangeText={text => setConfirmPassword(text)}
                placeholder="iMhungry@123"
                keyboardType="default"
                password={[password, confirmPassword]}
            />
            {/* use Touchable opacity instead */}
            <TouchableOpacity
                style={{
                    backgroundColor: "#4a6cd1",
                    padding: 30,
                    // flex: 1,
                    alignItems: "center",
                }}
                onPress={() => navigation.navigate("Login")}
            >
                <Text style={{
                    fontSize: 20,
                    textAlign: "center",
                    color: 'white'
                }}
                >
                    Signup
                </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}