package main

import "os"

// Build tags (rather obscure yes) can be used to reduce the size of the binary but can also be used to "selectively" compile something
// An example would be custom asserts - asserts are needed when developing or in staging but should be removed in production so it doesn't affect
// For the argument on whether we should use asserts - there is none, we simply follow NASA's Power of 10: Rules for Developing Safety-Critical Code

// To understand the effects, we run build the binary and then use go tool
// Firstly, the size is evidently bigger
// Secondly, the binary with prod tags does not have any CMP opcodes, which was used in the assertions. e.g assert(x > 0, "x must be positive"). We can also see branch instructions BLE & BGE.
// This is indicative that the build tags removed them in production builds

/*
> go build -tags prod -o ./std/build-tags/app-prod ./std/build-tags
> go tool objdump ./std/build-tags/app-prod
TEXT main.process(SB)
  main.go:68		0x100083550		d37ff800		LSL $1, R0, R0
  main.go:71		0x100083554		d65f03c0		RET
  main.go:71		0x100083558		00000000		?
  main.go:71		0x10008355c		00000000		?

> go build -tags dev -o ./std/build-tags/app-dev ./std/build-tags
> go tool objdump ./std/build-tags/app-dev
TEXT main.process(SB)
  main.go:64		0x100083550		f9400b90		MOVD 16(R28), R16
  main.go:64		0x100083554		eb3063ff		CMP R16, RSP
  main.go:64		0x100083558		540003a9		BLS 29(PC)
  main.go:64		0x10008355c		f81e0ffe		MOVD.W R30, -32(RSP)
  main.go:64		0x100083560		f81f83fd		MOVD R29, -8(RSP)
  main.go:64		0x100083564		d10023fd		SUB $8, RSP, R29
  main.go:65		0x100083568		f100001f		CMP $0, R0
  assert_dev.go:6	0x10008356c		540001ed		BLE 15(PC)
  main.go:66		0x100083570		f101901f		CMP $100, R0
  assert_dev.go:6	0x100083574		540000aa		BGE 5(PC)
  main.go:68		0x100083578		d37ff800		LSL $1, R0, R0
  main.go:71		0x10008357c		f85f83fd		MOVD -8(RSP), R29
  main.go:71		0x100083580		f84207fe		MOVD.P 32(RSP), R30
  main.go:71		0x100083584		d65f03c0		RET
  assert_dev.go:7	0x100083588		f0000000		ADRP 12288(PC), R0
  assert_dev.go:7	0x10008358c		911fdc00		ADD $2039, R0, R0
  assert_dev.go:7	0x100083590		d28002e1		MOVD $23, R1
  assert_dev.go:7	0x100083594		97ff8127		CALL runtime.convTstring(SB)
  assert_dev.go:7	0x100083598		aa0003e1		MOVD R0, R1
  assert_dev.go:7	0x10008359c		b0000160		ADRP 184320(PC), R0
  assert_dev.go:7	0x1000835a0		91130000		ADD $1216, R0, R0
  assert_dev.go:7	0x1000835a4		97ff859f		CALL runtime.gopanic(SB)
  assert_dev.go:7	0x1000835a8		d0000000		ADRP 8192(PC), R0
  assert_dev.go:7	0x1000835ac		911e5c00		ADD $1943, R0, R0
  assert_dev.go:7	0x1000835b0		d2800241		MOVD $18, R1
  assert_dev.go:7	0x1000835b4		97ff811f		CALL runtime.convTstring(SB)
  assert_dev.go:7	0x1000835b8		aa0003e1		MOVD R0, R1
  assert_dev.go:7	0x1000835bc		b0000160		ADRP 184320(PC), R0
  assert_dev.go:7	0x1000835c0		91130000		ADD $1216, R0, R0
  assert_dev.go:7	0x1000835c4		97ff8597		CALL runtime.gopanic(SB)
  assert_dev.go:7	0x1000835c8		d503201f		NOOP
  main.go:64		0x1000835cc		f90007e0		MOVD R0, 8(RSP)
  main.go:64		0x1000835d0		aa1e03e3		MOVD R30, R3
  main.go:64		0x1000835d4		97ff95fb		CALL runtime.morestack_noctxt.abi0(SB)
  main.go:64		0x1000835d8		f94007e0		MOVD 8(RSP), R0
  main.go:64		0x1000835dc		17ffffdd		JMP main.process(SB)

*/

/*
@dev need to prevent constant folding to showcase dead code elimination because compiler optimises
@dev also, let's separate main.main and main.process to make things clearer
*/

//go:noinline
func process(x int) int {
	assert(x > 0, "x must be positive")
	assert(x < 100, "x must be less than 100")

	result := x * 2

	assert(result > 0, "result must be positive")
	return result
}

func main() {
	// Use os.Args to prevent constant folding
	// The compiler can't know the value at compile time
	x := 42
	if len(os.Args) > 1 {
		x = 99 // Won't be called, but prevents constant folding
	}
	println(process(x))
}
