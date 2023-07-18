import React from "react";
import { shallow } from "enzyme";
import PlayerCard from "./PlayerCard";

describe("PlayerCard", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<PlayerCard />);
    expect(wrapper).toMatchSnapshot();
  });
});
