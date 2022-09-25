import * as React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Box, NativeBaseProvider, Text, Modal, Center } from "native-base";
import { ScaledSheet, scale } from "react-native-size-matters";
import WeekView, {
  createFixedWeekDate,
  addLocale,
} from "react-native-week-view";
import EventItem from "./EventItem";

export default class Horario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      event: {},
    };
    this.styles = ScaledSheet.create({
      headerText: {
        color: "#FFFF",
        fontSize: "15@s",
      },
      hourText: {
        color: "#FFFF",
        fontSize: "10@s",
      },
      gridColum: {
        borderColor: "transparent",
      },
      gridRow: {
        borderColor: "transparent",
      },
      header: {
        borderColor: "transparent",
      },
      eventContainer: {
        justifyContent: "center",
        fontSize: "200@vs",
      },
      eventCardContainer: {
        width: "60%",

        backgroundColor: "#E5E5E5",
      },
    });

    this.events = [];
    let colors = [];
    let materias = [];

    var colorArray = [
      "#bf9780",
      "#fdcae1",
      "#ffda89",
      "#84b6f4",
      "#fdfd96",
      "#ff6961",
      "#bae0f5",
      "#77dd77",
      "#98f6a9",
      "#bc98f3",
    ];

    global.alumno.horario.forEach((element, index) => {
      let startTime = element.horaEntrada.split(":");
      let endTime = element.horaSalida.split(":");

      if (!materias.includes(element.materia)) {
        materias.push(element.materia);
        colors[element.materia] = colorArray.pop();
      }

      element.id = index + 1;
      element.startDate = createFixedWeekDate(
        element.dia,
        Number(startTime[0]),
        Number(startTime[1])
      );
      element.endDate = createFixedWeekDate(
        element.dia,
        Number(endTime[0]),
        Number(endTime[1])
      );
      element.color = colors[element.materia];
    });
    this.events = global.alumno.horario;

    addLocale("es-mx", {
      months:
        "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split(
          "_"
        ),
      monthsShort:
        "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split(
          "_"
        ),
      weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split(
        "_"
      ),
      weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"),
    });
  }

  render() {
    return (
      <NativeBaseProvider>
        <Center>
          <Modal
            isOpen={this.state.showModal}
            onClose={() => this.setState({ showModal: false })}
          >
            <Modal.Content style={this.styles.eventCardContainer}>
              <Modal.CloseButton />
              <Modal.Header>
                <Text fontSize={scale(15)} fontWeight={"bold"}>
                  Detalles
                </Text>
              </Modal.Header>
              <Modal.Body>
                <Box>
                  <Text fontSize={scale(15)} fontWeight={"bold"}>
                    Materia:{" "}
                  </Text>
                  <Text fontSize={scale(12)}>{this.state.event.materia}</Text>
                </Box>
                <Box>
                  <Text fontSize={scale(15)} fontWeight={"bold"}>
                    Aula:{" "}
                  </Text>
                  <Text fontSize={scale(12)}>{this.state.event.aula}</Text>
                </Box>
                <Box>
                  <Text fontSize={scale(15)} fontWeight={"bold"}>
                    Hora de entrada:{" "}
                  </Text>
                  <Text fontSize={scale(12)}>
                    {this.state.event.horaEntrada}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize={scale(15)} fontWeight={"bold"}>
                    Hora de salida:{" "}
                  </Text>
                  <Text fontSize={scale(12)}>
                    {this.state.event.horaSalida}
                  </Text>
                </Box>
              </Modal.Body>
            </Modal.Content>
          </Modal>
        </Center>

        <LinearGradient
          colors={["#14213d", "#000000"]}
          style={{ flex: 1, justifyContent: "center" }}
        >
          <WeekView
            events={this.events}
            fixedHorizontally={true}
            // Recommended props:
            showTitle={false} // if true, shows this month and year
            numberOfDays={5}
            formatDateHeader="ddd"
            locale={"es-mx"}
            startHour={7}
            beginAgendaAt={7 * 60}
            endAgendaAt={14 * 60}
            hoursInDisplay={4}
            timesColumnWidth={0.1}
            showNowLine={true}
            headerTextStyle={this.styles.headerText}
            hourTextStyle={this.styles.hourText}
            gridColumnStyle={this.styles.gridColum}
            gridRowStyle={this.styles.gridRow}
            headerStyle={this.styles.header}
            nowLineColor={"black"}
            eventContainerStyle={this.styles.eventContainer}
            EventComponent={EventItem}
            onEventPress={(event) => {
              this.setState({ showModal: true });
              this.setState({ event: event });
            }}
            selectedDate={this.events[0].startDate}
          />
        </LinearGradient>
      </NativeBaseProvider>
    );
  }
}
