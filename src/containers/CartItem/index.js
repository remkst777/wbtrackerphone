import React from "react";
import { View, Text, Dimensions, Picker } from "react-native";
import PureChart from "react-native-pure-chart";
import { NavigationEvents } from "react-navigation";

import {
  border_secondary,
  bg_light,
  chart_color_1,
  chart_color_2
} from "../../styles";

import {
  getCartList,
  getDayStat,
  getPeriodStat
} from "../../utils/fetchHandler";

import { getTimezoneDifference } from "../../utils/dates";

import Loader from "../../components/Loader";

const timezoneDiff = getTimezoneDifference();

class CartItem extends React.PureComponent {
  state = initialState;

  componentDidMount = async () => {
    this.articulId = +this.props.navigation.state.params.id;

    await this.getInfo();

    const { days } = this.state.info;

    await this.getDayStat(days[days.length - 1]);
  };

  getInfo = async () => {
    this.setState({ ...initialState, infoLoading: true });

    const response = await getCartList({
      articulList: [this.articulId],
      timezoneDiff
    });

    await this.setState({ infoLoading: false, info: response.list[0] });
  };

  getDayStat = async day => {
    if (day) {
      this.setState({ statLoading: true, chart: null });

      const resp = await getDayStat({
        day,
        articul: this.articulId,
        timezoneDiff
      });
      const { values, times } = resp.info.stat;

      const chart = values.map((price, index) => ({
        y: price,
        x: times[index]
      }));

      this.setState({ statLoading: false, chart, pickerValue: day });
    }
  };

  getPeriodStat = async period => {
    if (period) {
      this.setState({ statLoading: true, chart: null });

      const resp = await getPeriodStat({
        period,
        articul: this.articulId,
        timezoneDiff
      });
      const { averageValues, minValues, days } = resp.info.stat;

      const averageValuesChart = averageValues.map((price, index) => ({
        y: price,
        x: days[index]
      }));

      const minValuesChart = minValues.map((price, index) => ({
        y: price,
        x: days[index]
      }));

      const chart = [
        { data: averageValuesChart, color: chart_color_1 },
        { data: minValuesChart, color: chart_color_2 }
      ];

      const pickerValue = periods.filter(x => x.value === period)[0].label;

      this.setState({ statLoading: false, chart, pickerValue });
    }
  };

  render() {
    const { info, chart, infoLoading, statLoading, pickerValue } = this.state;

    return (
      <View>
        <NavigationEvents
          onDidFocus={this.articulId ? this.componentDidMount : null}
        />

        <View>
          <Picker onValueChange={x => this.getDayStat(x)}>
            <Picker.Item label="Посмотреть статистику за день" value={null} />
            {info.days.map(x => (
              <Picker.Item key={x} label={x} value={x} />
            ))}
          </Picker>

          <Picker onValueChange={x => this.getPeriodStat(x)}>
            {periods.map(x => (
              <Picker.Item key={x.value} label={x.label} value={x.value} />
            ))}
          </Picker>
        </View>

        <View style={styles.chart}>
          <Loader ngIf={infoLoading || statLoading} />

          {chart && <PureChart data={chart} type="line" />}
        </View>

        {pickerValue && <Text style={styles.paragraph}>{pickerValue}</Text>}
        <Text style={styles.paragraph}>Артикул: {this.articulId}</Text>
      </View>
    );
  }
}

const styles = {
  paragraph: {
    marginBottom: 10
  },
  chart: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: border_secondary,
    marginBottom: 10,
    paddingVertical: 10,
    paddingRight: 20,
    backgroundColor: bg_light,
    minHeight: 175,
    justifyContent: "center"
  }
};

const periods = [
  { label: "Статистика за период", value: 0 },
  { label: "Статистика за 3 дня", value: 3 },
  { label: "Статистика за 7 дней", value: 7 },
  { label: "Статистика за 14 дней", value: 14 },
  { label: "Статистика за месяц", value: 28 }
];

const initialState = {
  infoLoading: false,
  chart: null,
  statLoading: false,
  pickerValue: null,
  info: {
    days: []
  }
};

export default CartItem;
