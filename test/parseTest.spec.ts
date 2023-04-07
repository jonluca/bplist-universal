import * as bplist from "../src/bplistParser";
import assert from "assert";
import path from "path";
import { describe, it, expect } from "vitest";
describe("bplist-universal", () => {
  const parseFileWithLogging = async (file: string) => {
    const startTime = performance.now();
    const [dict] = await bplist.parseFile(file);
    const endTime = performance.now();
    console.log(`Parsed "${file}" in ${endTime - startTime}ms`);
    return dict;
  };

  it("iTunes Small", async () => {
    const file = path.join(__dirname, "iTunes-small.bplist");
    const dict = await parseFileWithLogging(file);
    expect(dict["Application Version"]).to.equal("9.0.3");
    expect(dict["Library Persistent ID"], "6F81D37F95101437");
  });

  it("sample1", async () => {
    const file = path.join(__dirname, "sample1.bplist");
    const dict = await parseFileWithLogging(file);
    expect(dict["CFBundleIdentifier"], "com.apple.dictionary.MySample");
  });

  it("sample2", async () => {
    const file = path.join(__dirname, "sample2.bplist");
    const dict = await parseFileWithLogging(file);
    expect(
      dict["PopupMenu"][2]["Key"],
      '\n        #import <Cocoa/Cocoa.h>\n\n#import <MacRuby/MacRuby.h>\n\nint main(int argc, char *argv[])\n{\n  return macruby_main("rb_main.rb", argc, argv);\n}\n',
    );
  });

  it("airplay", async () => {
    const file = path.join(__dirname, "airplay.bplist");
    const dict = await parseFileWithLogging(file);
    expect(dict["duration"]).toEqual(5555.0495000000001);
    expect(dict["position"]).toEqual(4.6269989039999997);
  });

  it("utf16", async () => {
    const file = path.join(__dirname, "utf16.bplist");
    const dict = await parseFileWithLogging(file);
    expect(dict["CFBundleName"], "sellStuff");
    expect(dict["CFBundleShortVersionString"], "2.6.1");
    expect(dict["NSHumanReadableCopyright"], "©2008-2012, sellStuff, Inc.");
  });

  it("utf16chinese", async () => {
    const file = path.join(__dirname, "utf16_chinese.plist");
    const dict = await parseFileWithLogging(file);
    expect(dict["CFBundleName"], "天翼阅读");
    expect(dict["CFBundleDisplayName"], "天翼阅读");
  });

  it("uid", async () => {
    const file = path.join(__dirname, "uid.bplist");
    const dict = await parseFileWithLogging(file);
    assert.deepEqual(dict["$objects"][1]["NS.keys"], [{ UID: 2 }, { UID: 3 }, { UID: 4 }]);
    assert.deepEqual(dict["$objects"][1]["NS.objects"], [{ UID: 5 }, { UID: 6 }, { UID: 7 }]);
    assert.deepEqual(dict["$top"]["root"], { UID: 1 });
  });

  it("int64", async () => {
    const file = path.join(__dirname, "int64.bplist");
    const dict = await parseFileWithLogging(file);
    expect(dict["zero"], "0");
    expect(dict["int32item"], "1234567890");
    expect(dict["int32itemsigned"], "-1234567890");
    expect(dict["int64item"], "12345678901234567890");
  });

  it("binary", async () => {
    const file = path.join(__dirname, "info-binary1.plist");
    const dict = await parseFileWithLogging(file);
    expect(dict).toEqual({
      DTPlatformVersion: "10.0",
      DTPlatformName: "iphonesimulator",
      DTPlatformBuild: "",
      CFBundleDevelopmentRegion: "en",
    });
  });
});
